'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Handles user login.
 * @param prevState - Previous form state (used by useFormState).
 * @param formData - The form data containing email and password.
 * @returns An error message string or redirects on success.
 */
export async function login(prevState: string | undefined, formData: FormData) {
  console.log('[Server Action] Attempting login...');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  // Basic validation (you can add more robust validation later)
  if (!email || !password) {
    return "Email and password are required.";
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[Server Action] Login Error:", error.message);
    return "Could not authenticate user. Please check your credentials.";
  }

  console.log('[Server Action] Login successful, redirecting...');
  return redirect('/dashboard'); // Redirect on success
}

/**
 * Handles user signup.
 * @param prevState - Previous form state.
 * @param formData - The form data containing email and password.
 * @returns A message string or redirects.
 */
export async function signup(prevState: string | undefined, formData: FormData) {
  console.log('[Server Action] Attempting signup...');
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Use env var for base URL
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  if (!email || !password) {
    return "Email and password are required.";
  }
  if (password.length < 6) {
     return "Password must be at least 6 characters long.";
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This URL is where Supabase will send the user back to
      // after they click the confirmation link in their email.
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("[Server Action] Signup Error:", error.message);
    if (error.message.includes("User already registered")) {
      return "This email is already registered. Please log in.";
    }
    return 'Could not sign up user. Please try again.';
  }

  console.log('[Server Action] Signup initiated, confirmation email sent.');
  // Return a success message to display on the UI
  return "Please check your email to confirm your account!";
}

/**
 * Handles user logout.
 */
export async function logout() {
  console.log('[Server Action] Logging out...');
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
} 