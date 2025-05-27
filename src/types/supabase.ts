export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          status: 'draft' | 'scheduled' | 'published';
          scheduled_for?: string;
          published_at?: string;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
      };
      social_accounts: {
        Row: {
          id: string;
          platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
          username: string;
          connected_at: string;
          user_id: string;
        };
        Insert: Omit<Database['public']['Tables']['social_accounts']['Row'], 'id' | 'connected_at'>;
        Update: Partial<Database['public']['Tables']['social_accounts']['Insert']>;
      };
    };
  };
}; 