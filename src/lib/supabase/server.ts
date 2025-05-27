import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
// Note: Using dynamic import for 'cookies' from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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