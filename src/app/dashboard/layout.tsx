import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarInset } from "@/components/ui/sidebar"; // Assuming SidebarProvider is here based on recent code

import { cn } from "@/lib/utils";
// Removed icon imports as they are now in dashboard-sidebar-nav.tsx
// import { IconHome, IconFileText, IconCalendarEvent, IconChartBar, IconCircleCheck, IconClock, IconCloudUpload, IconCalendarDue, IconUsers, IconUserPlus, IconSettings, IconQuestionMark } from "@tabler/icons-react";
// Removed unused import of DashboardContent
// import DashboardContent from "@/components/dashboard/dashboard-content";
import DashboardSidebarNav from "@/components/dashboard/dashboard-sidebar-nav"; // Import the new component
import AnnouncementBar from "@/components/dashboard/announcement-bar"; // Import the AnnouncementBar component




export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <AnnouncementBar />
      <SidebarProvider>
        <div className={cn(
          "flex min-h-screen",
          "mt-[var(--announcement-bar-height)]", // Changed from pt to mt to ensure proper spacing
          "p-0 m-0" 
        )}>
          <Sidebar 
            variant="inset" 
            className="z-30 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75"
          >
            <DashboardSidebarNav />
          </Sidebar>
          <SidebarInset className="z-10 relative flex-1 min-w-0">
            <SidebarTrigger 
              className="fixed top-[calc(var(--announcement-bar-height)+1rem)] left-[calc(var(--sidebar-width)+1rem)] z-40 md:static md:top-4 md:left-4 focus:outline-none focus:ring-2 focus:ring-primary/50" 
            />
            <SidebarContent className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
              <div className="h-full w-full space-y-6">
                {children}
              </div>
            </SidebarContent>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}