import { createClient } from '@/lib/supabase/server';
import { encryptToken } from '@/lib/encryption';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Check if user is logged in
  if (!user) {
    console.error('[Callback] No user session found.');
    return NextResponse.redirect(new URL('/login?error=unauthenticated', request.url));
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const receivedState = url.searchParams.get('state');

  // 2. Check for code & state
  if (!code) {
    const errorDesc = url.searchParams.get('error_description') || 'Facebook authorization failed.';
    console.error(`[Callback] Facebook auth failed: ${errorDesc}`);
    return NextResponse.redirect(new URL(`/dashboard?error=${encodeURIComponent(errorDesc)}`, request.url));
  }

  // 3. CSRF Protection: (placeholder, see notes)
  // TODO: Implement state verification using cookies or another secure method
  // const originalState = request.cookies.get('fb_oauth_state')?.value;
  // if (!receivedState || receivedState !== originalState) {
  //   console.error('[Callback] State mismatch - CSRF attempt or error.');
  //   return NextResponse.redirect(new URL('/dashboard?error=state_mismatch', request.url));
  // }

  const appId = process.env.FACEBOOK_APP_ID!;
  const appSecret = process.env.FACEBOOK_APP_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/facebook/callback`;

  if (!appId || !appSecret || !redirectUri) {
    console.error('[Callback] Facebook App ID/Secret/Redirect URI missing in env.');
    return NextResponse.redirect(new URL('/dashboard?error=config_error', request.url));
  }

  try {
    // 4. Exchange code for a short-lived user access token
    console.log('[Callback] Exchanging code for token...');
    const tokenResponse = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token`, {
      params: { client_id: appId, redirect_uri: redirectUri, client_secret: appSecret, code: code },
    });
    const shortLivedToken = tokenResponse.data.access_token;
    if (!shortLivedToken) throw new Error('Failed to get short-lived token.');

    // 5. Exchange for a long-lived user access token
    console.log('[Callback] Exchanging for long-lived token...');
    const longLivedResponse = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token`, {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: shortLivedToken,
      },
    });
    const longLivedToken = longLivedResponse.data.access_token;
    if (!longLivedToken) throw new Error('Failed to get long-lived token.');

    // 6. Get user's pages using the LONG-LIVED token
    console.log('[Callback] Fetching pages...');
    const pagesResponse = await axios.get(`https://graph.facebook.com/me/accounts`, {
      params: {
        access_token: longLivedToken,
        fields: 'id,name,access_token,instagram_business_account{id,username}',
      },
    });
    const pagesData = pagesResponse.data.data;
    if (!pagesData || pagesData.length === 0) {
      console.warn('[Callback] User has no manageable pages.');
      return NextResponse.redirect(new URL('/dashboard?warning=no_pages_found', request.url));
    }

    // 7. Process each page/account
    console.log(`[Callback] Processing ${pagesData.length} page(s)...`);
    for (const page of pagesData) {
      const platform = page.instagram_business_account ? 'instagram' : 'facebook';
      const platformId = page.instagram_business_account ? page.instagram_business_account.id : page.id;
      const accountName = page.instagram_business_account ? page.instagram_business_account.username : page.name;
      const pageAccessToken = page.access_token;

      if (!pageAccessToken) {
        console.warn(`[Callback] No access token for page ${page.name}, skipping.`);
        continue;
      }

      const encryptedToken = encryptToken(pageAccessToken);

      // Upsert: Insert or update based on user_id and platform_account_id
      const { error: upsertError } = await supabase.from('social_accounts').upsert(
        {
          user_id: user.id,
          platform: platform,
          platform_account_id: platformId,
          account_name: accountName,
          access_token_encrypted: encryptedToken,
          iv: null, // If your schema requires an iv, update accordingly
          status: 'active',
        },
        { onConflict: 'user_id, platform_account_id' }
      );

      if (upsertError) {
        console.error(`[Callback] Supabase upsert error for ${accountName}:`, upsertError);
        // Continue processing other pages
      } else {
        console.log(`[Callback] Successfully added/updated ${accountName}.`);
      }
    }

    // 8. Redirect back to dashboard on success
    return NextResponse.redirect(new URL('/dashboard?success=accounts_linked', request.url));
  } catch (error: any) {
    console.error('[Callback] Full OAuth Error:', error.isAxiosError ? error.response?.data : error.message);
    return NextResponse.redirect(new URL('/dashboard?error=fb_callback_failed', request.url));
  }
} 