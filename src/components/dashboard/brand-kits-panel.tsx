import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Plus } from "lucide-react";

export default function BrandKitsPanel() {
  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Brand Kits</h1>
        <Button size="sm" className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          New Brand Kit
        </Button>
      </div>

      {/* Brand Kits Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">Brand Kits</h2>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>

        <Card>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">
              Generate content that looks and sounds exactly like you
            </h3>
            <p className="text-sm text-muted-foreground">
              Blaze will analyze the posts, photos, copy, and files in your
              accounts to generate content
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Brand Kit
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Snippets Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">Snippets</h2>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>

        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <Button variant="ghost" size="lg" className="flex-col space-y-1">
              <Plus className="h-6 w-6" />
              <span className="text-sm">New Snippet</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
