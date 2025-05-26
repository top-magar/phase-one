import { createClient } from '@/lib/supabase/server';
import { disconnectAccount } from '@/app/dashboard/actions';

// Define the type for an account (matches your schema)
type SocialAccount = {
  id: string;
  platform: 'facebook' | 'instagram' | string;
  account_name: string;
  status: string;
};

export default async function ConnectedAccountsList() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <p>Please log in to see your accounts.</p>;
  }

  // Fetch only necessary fields, DO NOT fetch tokens to the client
  const { data: accounts, error } = await supabase
    .from('social_accounts')
    .select('id, platform, account_name, status')
    .eq('user_id', user.id);

  if (error) {
    console.error("Error fetching accounts:", error);
    return <p className="text-red-500">Could not fetch accounts. Please try again later.</p>;
  }

  if (!accounts || accounts.length === 0) {
    return <p>You haven't connected any accounts yet.</p>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {accounts.map((account: SocialAccount) => (
        <li key={account.id} className="flex justify-between items-center gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4 items-center">
            {/* Basic Platform Icon - You can replace with actual SVGs/Images */}
            <div className={`h-10 w-10 flex-none rounded-full ${account.platform === 'instagram' ? 'bg-pink-500' : 'bg-blue-600'} flex items-center justify-center text-white font-bold`}>
              {account.platform === 'instagram' ? 'IG' : 'FB'}
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{account.account_name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)} - 
                <span className={`capitalize ${account.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {account.status}
                </span>
              </p>
            </div>
          </div>
          <form action={disconnectAccount}>
            <input type="hidden" name="accountId" value={account.id} />
            <button 
              type="submit"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50"
            >
              Disconnect
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
} 