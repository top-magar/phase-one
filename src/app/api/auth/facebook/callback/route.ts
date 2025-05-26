import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { encryptToken } from '@/lib/encryption'; // Assuming encryption utility

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = await cookies(); // Await the cookies() call
  const storedState = cookieStore.get('fb_oauth_state')?.value; // Retrieve state from cookie

  // 1. & 2. Receive code and state, and verify state for CSRF protection
  if (!state || state !== storedState) {
    console.error('CSRF state check failed');
    // Clear the state cookie after check
    cookieStore.delete('fb_oauth_state');
    return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=Invalid state parameter`);
  }

  // Clear the state cookie after successful verification
  cookieStore.delete('fb_oauth_state');

  // Check if code is present
  if (!code) {
     console.error('OAuth code not received');
     return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=Authorization code not received`);
  }

  // 3. Exchange the code for a short-lived user access token
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const redirectUri = `${new URL('/api/auth/facebook/callback', request.url).origin}/api/auth/facebook/callback`;

  if (!appId || !appSecret || !redirectUri) {
     console.error('Facebook app credentials or redirect URI are not configured.');
     return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=Server configuration error`);
  }

  try {
    const tokenExchangeUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;

    const tokenResponse = await fetch(tokenExchangeUrl, { method: 'GET' });
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Error exchanging code for token:', tokenData.error);
      return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=${tokenData.error.message || 'Failed to get access token'}`);
    }

    const shortLivedToken = tokenData.access_token;
    // const expiresIn = tokenData.expires_in; // Short-lived tokens expire quickly

    console.log('Successfully obtained short-lived token.');

    // 4. Exchange the short-lived token for a long-lived user access token
    console.log('Exchanging for long-lived token...');
    const longLivedExchangeUrl = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`;

    const longLivedResponse = await fetch(longLivedExchangeUrl, { method: 'GET' });
    const longLivedData = await longLivedResponse.json();

    if (longLivedData.error) {
      console.error('Error exchanging for long-lived token:', longLivedData.error);
      return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=${longLivedData.error.message || 'Failed to get long-lived access token'}`);
    }

    const longLivedToken = longLivedData.access_token;
    const longLivedExpiresIn = longLivedData.expires_in; // Long-lived tokens last 60 days

    console.log('Successfully obtained long-lived token.');
    console.log('Long-lived token expires in:', longLivedExpiresIn, 'seconds');

    // 5. Use the long-lived token to fetch Facebook Pages and Instagram Business Accounts
    console.log('Fetching user pages and Instagram accounts...');
    const accountsResponse = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedToken}&fields=id,name,access_token,instagram_business_account{id,username}`, { method: 'GET' });
    const accountsData = await accountsResponse.json();

    if (accountsData.error) {
      console.error('Error fetching accounts:', accountsData.error);
      return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=${accountsData.error.message || 'Failed to fetch accounts'}`);
    }

    const userAccounts = accountsData.data;

    if (!userAccounts || userAccounts.length === 0) {
      console.warn('No Facebook pages or Instagram business accounts found for this user.');
      // Redirect with a warning or success message indicating no accounts were linked
      return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?success=no_accounts_found`);
    }

    console.log(`Found ${userAccounts.length} accounts.`);

    // 6. Encrypt Page/Account access tokens and 7. Store account details in Supabase
    const supabase = await createClient(); // Await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('User not authenticated after OAuth flow.');
       return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=User not authenticated`);
    }

    for (const account of userAccounts) {
      const platform = account.instagram_business_account ? 'instagram' : 'facebook';
      const platformId = account.instagram_business_account ? account.instagram_business_account.id : account.id;
      const accountName = account.instagram_business_account ? account.instagram_business_account.username : account.name;
      const pageAccessToken = account.access_token; // This is the Page access token, needed for publishing

      if (!pageAccessToken) {
        console.warn(`No access token for ${accountName}, skipping.`);
        continue;
      }

      // Encrypt the page access token
      let encryptedTokenString: string;
      try {
         encryptedTokenString = encryptToken(pageAccessToken);
      } catch (encryptError) {
         console.error(`Error encrypting token for ${accountName}:`, encryptError);
         // Optionally, handle this error more gracefully, maybe skip this account
         continue;
      }

      // Extract IV and encrypted data from the returned string
      const [ivHex, encryptedDataHex] = encryptedTokenString.split(':');

      // Check if splitting was successful (expect at least iv:encryptedData)
      if (!ivHex || !encryptedDataHex) {
        console.error(`Encryption output format incorrect for ${accountName}`);
        continue;
      }

      const encryptedData = encryptedDataHex; // The encrypted part
      const iv = ivHex; // The IV

      // Upsert the account data into Supabase
      const { error: upsertError } = await supabase.from('social_accounts').upsert(
        {
          user_id: user.id,
          platform: platform,
          platform_account_id: platformId,
          account_name: accountName,
          access_token_encrypted: encryptedData,
          iv: iv, // Store the IV used for encryption
          status: 'active',
        },
        { onConflict: 'user_id, platform_account_id' } // Conflict on user_id and platform_account_id
      );

      if (upsertError) {
        console.error(`Supabase upsert error for ${accountName}:`, upsertError);
        // Decide how to handle upsert errors (e.g., continue or stop)
      } else {
        console.log(`Successfully added/updated ${accountName} in Supabase.`);
      }
    }

    // 8. Redirect to dashboard with success message
    return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?success=accounts_linked`);

  } catch (error) {
    console.error('Exception during OAuth flow:', error);
    return NextResponse.redirect(`${new URL('/dashboard', request.url).origin}/dashboard?error=oauth_error&error_description=An unexpected error occurred`);
  }
} 