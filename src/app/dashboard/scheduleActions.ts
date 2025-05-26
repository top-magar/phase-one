'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ActionState = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function schedulePostAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = createClient();
  
  // Get user session
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect('/login');
  }

  // Validate required fields
  const content = formData.get('content') as string;
  const socialAccountId = formData.get('socialAccountId') as string;
  const scheduleTime = formData.get('scheduleTime') as string;

  if (!content || !socialAccountId || !scheduleTime) {
    return {
      success: false,
      error: 'Please fill in all required fields'
    };
  }

  try {
    // Insert scheduled post
    const { error: insertError } = await supabase
      .from('scheduled_posts')
      .insert({
        user_id: user.id,
        social_account_id: socialAccountId,
        content,
        scheduled_time: scheduleTime,
        status: 'scheduled'
      });

    if (insertError) {
      console.error('Error scheduling post:', insertError);
      return {
        success: false,
        error: 'Failed to schedule post. Please try again.'
      };
    }

    // Revalidate dashboard to show new post
    revalidatePath('/dashboard');
    
    return {
      success: true,
      message: 'Post scheduled successfully!'
    };
  } catch (error) {
    console.error('Error in schedulePostAction:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
} 