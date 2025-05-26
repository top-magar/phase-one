// Global type definitions

// User related types
interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

// Post related types
interface Post {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduled_for?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

// Social media account types
interface SocialAccount {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  username: string;
  connected_at: string;
  user_id: string;
}

// Export types
export type { User, Post, SocialAccount }; 