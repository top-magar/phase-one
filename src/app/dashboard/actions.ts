'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function disconnectAccount(formData: FormData) {
  const accountId = formData.get('accountId') as string;
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  if (!accountId) {
    console.error("Disconnect Error: No account ID provided.");
    return; 
  }

  console.log(`[Action] Attempting to disconnect account: ${accountId} for user: ${user.id}`);

  // Delete the account, ensuring it belongs to the current user (RLS also protects this)
  const { error } = await supabase
    .from('social_accounts')
    .delete()
    .eq('id', accountId)
    .eq('user_id', user.id); // Double check ownership

  if (error) {
    console.error("Disconnect Error:", error);
    return;
  }

  // Revalidate the dashboard path to refresh the list on the UI
  revalidatePath('/dashboard'); 
  console.log(`[Action] Successfully disconnected account: ${accountId}`);
} 