import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Debug logging
  console.log('Client Environment Variables Check:');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Your project\'s URL and Anon Key are required to create a Supabase client! Check your Supabase project\'s API settings to find these values: https://supabase.com/dashboard/project/_/settings/api');
  }

  const client = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      global: {
        fetch: (...args) => {
          console.log('Fetch request:', args[0]);
          return fetch(...args).catch(error => {
            console.error('Fetch error:', error);
            throw error;
          });
        },
      },
    }
  );

  return client;
}; 