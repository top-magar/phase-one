export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      social_accounts: {
        Row: {
          id: string
          user_id: string
          platform: string
          platform_account_id: string
          account_name: string
          access_token_encrypted: string
          token_expires_at: string | null
          connected_at: string
          status: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: string
          platform_account_id: string
          account_name: string
          access_token_encrypted: string
          token_expires_at?: string | null
          connected_at?: string
          status?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: string
          platform_account_id?: string
          account_name?: string
          access_token_encrypted?: string
          token_expires_at?: string | null
          connected_at?: string
          status?: string
        }
      }
      scheduled_posts: {
        Row: {
          id: string
          user_id: string
          social_account_id: string
          content: string
          media_urls: string[] | null
          scheduled_at: string
          status: string
          published_at: string | null
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          social_account_id: string
          content: string
          media_urls?: string[] | null
          scheduled_at: string
          status?: string
          published_at?: string | null
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          social_account_id?: string
          content?: string
          media_urls?: string[] | null
          scheduled_at?: string
          status?: string
          published_at?: string | null
          error_message?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 