"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, BadgeCheck } from "lucide-react";

export default function ReviewsApprovalsPanel() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Reviews &amp; Approvals</h1>

      {/* Tabs */}
      <Tabs defaultValue="assigned" className="w-full">
        <TabsList>
          <TabsTrigger value="assigned">
            Assigned to you <Badge variant="secondary" className="ml-1">0</Badge>
          </TabsTrigger>
          <TabsTrigger value="requests">
            Your Requests <Badge variant="secondary" className="ml-1">0</Badge>
          </TabsTrigger>
          <TabsTrigger value="ended" disabled>
            Recently Ended
          </TabsTrigger>
          <TabsTrigger value="completed" disabled>
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assigned">
          <Card className="mt-4">
            <CardContent className="flex flex-col items-center py-12 space-y-4">
              <div className="relative">
                <User className="h-12 w-12 text-purple-500" />
                <BadgeCheck className="absolute bottom-0 right-0 h-6 w-6 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold">All tasks and feedback.</h2>
              <p className="text-center text-sm text-muted-foreground max-w-xs">
                Use reviews for feedback and approvals. Paired with tasks, they provide a clear view of outstanding to-dos.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          {/* TODO: render “Your Requests” list here */}
          <Card className="mt-4">
          <CardContent className="flex flex-col items-center py-12 space-y-4">
              <div className="relative">
                <User className="h-12 w-12 text-purple-500" />
                <BadgeCheck className="absolute bottom-0 right-0 h-6 w-6 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold">All tasks and feedback.</h2>
              <p className="text-center text-sm text-muted-foreground max-w-xs">
                Use reviews for feedback and approvals. Paired with tasks, they provide a clear view of outstanding to-dos.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stub out other tabs if needed */}
        <TabsContent value="ended">
          {/* Recently ended approvals */}
        </TabsContent>
        <TabsContent value="completed">
          {/* Completed approvals */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
