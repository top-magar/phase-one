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
    <>
      <AnnouncementBar /> {/* Render the AnnouncementBar here */}
      <SidebarProvider>
        
        <div className={cn(
          "flex min-h-screen",
          "bg-gradient-to-br from-neutral-50 to-neutral-100", // Using the gradient from the previous page.tsx
          "dark:from-neutral-950 dark:to-neutral-900", // Using the gradient from the previous page.tsx
          "pt-[calc(1.75rem + var(--announcement-bar-height))]"
        )}>
          <Sidebar>
            <DashboardSidebarNav /> {/* Use the new navigation component */}

          </Sidebar>
          <SidebarInset>
            <SidebarTrigger className="m-4" /> {/* Add the trigger button */}
            <SidebarContent>{children}</SidebarContent>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}