'use client';

import { useState } from 'react';

interface DisconnectButtonProps {
  accountId: string;
  platform: string;
}

const DisconnectButton = ({ accountId, platform }: DisconnectButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDisconnect = async () => {
    if (!confirm(`Are you sure you want to disconnect this ${platform} account?`)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/auth/${platform}/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        throw new Error('Failed to disconnect account');
      }

      // Refresh the page to update the accounts list
      window.location.reload();
    } catch (err) {
      setError('Failed to disconnect account. Please try again.');
      setIsLoading(false);
      console.error('Disconnect error:', err);
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute bottom-full mb-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
          {error}
        </div>
      )}
      <button
        onClick={handleDisconnect}
        disabled={isLoading}
        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Disconnecting...' : 'Disconnect'}
      </button>
    </div>
  );
};

export default DisconnectButton; 