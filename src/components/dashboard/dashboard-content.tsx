"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { tokens } from "@/lib/theme";
import { cn } from "@/lib/utils";
import React from 'react';

// Import panel components
import HomePanel from "@/components/dashboard/panels/home-panel";
import BrandKitsPanel from "@/components/dashboard/panels/brand-kits-panel";
import TemplatesPanel from "@/components/dashboard/panels/templates-panel";
import CalendarPanel from "@/components/dashboard/panels/calendar-panel";
import AnalyticsPanel from "@/components/dashboard/panels/analytics-panel";
import ApprovalsPanel from "@/components/dashboard/panels/approvals-panel";
import RecentPanel from "@/components/dashboard/panels/recent-panel";
import UploadsPanel from "@/components/dashboard/panels/uploads-panel";
import ContentCalendarPanel from "@/components/dashboard/panels/content-calendar-panel";
import IntegrationsPanel from "@/components/dashboard/panels/integrations-panel";
import HelpPanel from "@/components/dashboard/panels/help-panel";

// Define a map of paths to panel components
// This mapping is no longer needed in this component
// const panels: { [key: string]: React.ComponentType<any> } = {
//   "/dashboard": HomePanel,
//   "/dashboard/brand-kits": BrandKitsPanel,
//   "/dashboard/templates": TemplatesPanel,
//   "/dashboard/calendar": CalendarPanel,
//   "/dashboard/analytics": AnalyticsPanel,
//   "/dashboard/approvals": ApprovalsPanel,
//   "/dashboard/recent": RecentPanel,
//   "/dashboard/uploads": UploadsPanel,
//   "/dashboard/content-calendar": ContentCalendarPanel,
//   "/settings/integrations": IntegrationsPanel,
//   "/help": HelpPanel,
// };

export default function DashboardContent({ children }: { children: React.ReactNode }) {
  // usePathname and dynamic rendering logic are moved to individual page files
  // const pathname = usePathname();
  // const ActivePanel = panels[pathname];

  // if (!ActivePanel) {
  //   return (
  //     <main className="flex-1 overflow-y-auto p-8">
  //       <div className="text-center text-muted-foreground">
  //         Panel not found for path: {pathname}
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <main className="flex-1 overflow-y-auto">
      {/* The motion div can wrap the children */}
      <motion.div
        key={usePathname()} // Still use pathname for transition key
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, timing: tokens.animations.timing.default }}
        className="space-y-8 p-8"
      >
        {children} {/* Render the routed page component */}
      </motion.div>
    </main>
  );
} 