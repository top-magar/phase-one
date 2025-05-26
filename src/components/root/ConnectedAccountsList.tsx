"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/server";
import { disconnectAccount } from "@/lib/supabase/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { tokens } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

type SocialAccount = {
  id: string;
  platform: string;
  username: string;
  created_at: string;
};

const PLATFORM_CONFIG = {
  twitter: {
    icon: <Twitter className="h-4 w-4" />,
    bgColor: "bg-blue-500",
  },
  facebook: {
    icon: <Facebook className="h-4 w-4" />,
    bgColor: "bg-blue-600",
  },
  instagram: {
    icon: <Instagram className="h-4 w-4" />,
    bgColor: "bg-pink-500",
  },
  linkedin: {
    icon: <Linkedin className="h-4 w-4" />,
    bgColor: "bg-blue-700",
  },
};

export default function ConnectedAccountsList() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setError("Please log in to view your connected accounts");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("social_accounts")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        setAccounts(data || []);
      } catch (err) {
        setError("Failed to load connected accounts");
        console.error("Error loading accounts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, []);

  const handleDisconnect = async (accountId: string) => {
    try {
      await disconnectAccount(accountId);
      setAccounts(accounts.filter(acc => acc.id !== accountId));
    } catch (err) {
      setError("Failed to disconnect account");
      console.error("Error disconnecting account:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (accounts.length === 0) {
    return (
      <Alert>
        <AlertDescription>No connected accounts found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {accounts.map((account) => {
        const platformConfig = PLATFORM_CONFIG[account.platform as keyof typeof PLATFORM_CONFIG];
        
        return (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, timing: tokens.animations.timing.default }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={cn("p-2 rounded-lg", platformConfig.bgColor)}>
                      <span className="text-lg">{platformConfig.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                      </h3>
                      <p className="text-sm text-muted-foreground">@{account.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      Connected {new Date(account.created_at).toLocaleDateString()}
                    </Badge>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDisconnect(account.id)}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
} 