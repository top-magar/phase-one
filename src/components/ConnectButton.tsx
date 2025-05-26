'use client';

import { useState, useEffect } from 'react';

const ConnectButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for OAuth errors in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
      setError(urlParams.get('error_description') || urlParams.get('error') || 'Authentication failed');
      // Clear the error from URL without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleConnect = () => {
    setIsLoading(true);
    setError(null);
    
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/facebook/callback`;
    
    if (!appId || !redirectUri) {
      setError("Facebook integration is not configured correctly. Please check your environment variables.");
      setIsLoading(false);
      return;
    }

    try {
      // Generate a random state for CSRF protection
      const state = crypto.randomUUID();

      // Define required permissions (must match your App Review submission)
      const scope = [
        'pages_show_list',
        'pages_manage_posts',
        'instagram_basic',
        'instagram_content_publish',
        'public_profile',
        'email'
      ].join(',');

      // Store state in sessionStorage for verification in callback
      sessionStorage.setItem('fb_oauth_state', state);

      const facebookAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&response_type=code`;
      
      // Log the URL for debugging (remove in production)
      console.log('Redirecting to:', facebookAuthUrl);
      
      // Redirect the user to Facebook
      window.location.href = facebookAuthUrl;
    } catch (err) {
      setError('Failed to initiate Facebook connection. Please try again.');
      setIsLoading(false);
      console.error('Facebook OAuth error:', err);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isLoading ? 'Connecting...' : 'Connect Facebook / Instagram'}
      </button>
    </div>
  );
};

export default ConnectButton; 