import { createServerClient } from '@supabase/ssr';
// Note: Using dynamic import for 'cookies' from 'next/headers'

export const createClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Debug logging
  console.log('Environment Variables Check:');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Your project\'s URL and Key are required to create a Supabase client! Check your Supabase project\'s API settings to find these values: https://supabase.com/dashboard/project/_/settings/api');
  }

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie errors
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie errors
          }
        },
      },
    }
  );
};

export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error: _error } = await supabase.auth.getUser(); // Rename unused error
  return user;
}

export async function isAdmin() {
  const supabase = await createClient();
  const { data: { user }, error: _error } = await supabase.auth.getUser(); // Rename unused error
  if (!user) return false;
  // In a real app, you'd check user metadata or roles
  return user.email === 'admin@example.com'; // Replace with actual admin check logic
}