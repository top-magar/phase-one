"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LayoutGrid, List as ListIcon, ChevronDown, UploadCloud } from "lucide-react";

export default function UploadsPanel() {
  const [view, setView] = React.useState<"grid" | "list">("grid");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Uploads</h1>
        <div className="flex items-center space-x-2">
          {/* Grid/List toggle */}
          <Select value={view} onValueChange={(v) => setView(v as any)}>
            <SelectTrigger size="sm" className="flex items-center space-x-1">
              {view === "grid" ? (
                <LayoutGrid className="h-4 w-4" />
              ) : (
                <ListIcon className="h-4 w-4" />
              )}
              <SelectValue />
              <ChevronDown className="ml-1 h-4 w-4" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="grid" className="flex items-center space-x-2">
                <LayoutGrid className="h-4 w-4" />
                <span>Grid</span>
              </SelectItem>
              <SelectItem value="list" className="flex items-center space-x-2">
                <ListIcon className="h-4 w-4" />
                <span>List</span>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Upload action */}
          <Button size="sm" className="flex items-center">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Empty Dropzone */}
      <div
        className="border-2 border-dashed border-muted-foreground/50 rounded-lg py-20 flex flex-col items-center justify-center text-center space-y-4"
      >
        {/* Replace with your actual illustration */}
        <img
          src="/illustrations/upload-empty-state.png"
          alt="Drop files illustration"
          className="h-24 drop-shadow-lg"
        />

        <p className="text-sm font-medium">Drop files here or</p>
        <Button variant="outline" size="sm" className="flex items-center">
          <UploadCloud className="mr-2 h-4 w-4" />
          Choose Files
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          Blaze supports uploading images and videos
        </p>
      </div>
    </div>
  );
}
