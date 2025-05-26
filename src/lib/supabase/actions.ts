"use server";

import { createClient } from "./server";
import { revalidatePath } from "next/cache";
import { Post, SocialAccount } from '@/types';

export async function disconnectAccount(accountId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("social_accounts")
    .delete()
    .eq("id", accountId);

  if (error) {
    throw new Error("Failed to disconnect account");
  }

  revalidatePath("/dashboard");
}

export async function getPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Post[];
}

export async function getSocialAccounts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('social_accounts')
    .select('*');

  if (error) throw error;
  return data as SocialAccount[];
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

export async function deletePost(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
} 