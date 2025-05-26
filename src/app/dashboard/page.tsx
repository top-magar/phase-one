import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ConnectButton from '@/components/ConnectButton';
import ConnectedAccountsList from '@/components/ConnectedAccountsList';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Phase One, {user.email}!</h1>
      <p className="mb-8">Manage your social media accounts here.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Connect New Account</h2>
        <ConnectButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Connected Accounts</h2>
        <ConnectedAccountsList />
      </div>
    </div>
  );
} 