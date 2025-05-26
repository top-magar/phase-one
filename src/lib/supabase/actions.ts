"use server";

import { createClient } from "./server";
import { revalidatePath } from "next/cache";

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