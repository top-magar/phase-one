"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Folder, FileText, ImageIcon, Users, Upload, LayoutGrid, List as ListIcon, ChevronDown } from "lucide-react";

export interface RecentItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  category: "projects" | "docs" | "designs" | "shared" | "uploads";
}

interface RecentPanelProps {
  items: RecentItem[];
}

export default function RecentPanel({ items }: RecentPanelProps) {
  const [filter, setFilter] = useState<RecentItem["category"] | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Filter items by selected pill
  const filtered = useMemo(() => {
    return filter === "all"
      ? items
      : items.filter((i) => i.category === filter);
  }, [items, filter]);

  const pills = [
    { value: "all",   label: "All",            icon: Loader2 },
    { value: "projects", label: "Projects",    icon: Folder },
    { value: "docs",  label: "Docs",           icon: FileText },
    { value: "designs", label: "Designs",      icon: ImageIcon },
    { value: "shared", label: "Shared with me", icon: Users },
    { value: "uploads", label: "Uploads",      icon: Upload },
  ] as const;

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Recent</h1>

      {/* Filter pills + View select */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {pills.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              size="sm"
              variant={filter === value ? "default" : "outline"}
              onClick={() => setFilter(value)}
              className="flex items-center space-x-1"
            >
              {value === "all"
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <Icon className="h-4 w-4" />
              }
              <span className="whitespace-nowrap">{label}</span>
            </Button>
          ))}
        </div>

        <Select value={view} onValueChange={(v) => setView(v as any)}>
          <SelectTrigger size="sm" className="flex items-center space-x-1">
            {view === "grid"
              ? <LayoutGrid className="h-4 w-4" />
              : <ListIcon className="h-4 w-4" />
            }
            <SelectValue placeholder="Grid View" />
            <ChevronDown className="ml-1 h-4 w-4" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="grid" className="flex items-center space-x-2">
              <LayoutGrid className="h-4 w-4" />
              <span>Grid View</span>
            </SelectItem>
            <SelectItem value="list" className="flex items-center space-x-2">
              <ListIcon className="h-4 w-4" />
              <span>List View</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No items found.
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-2">
                <p className="text-sm font-medium truncate">{item.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center space-x-4 p-2">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-12 w-12 object-cover rounded"
                />
                <p className="text-sm font-medium">{item.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
