"use client";

// Removed unused imports: useState, useEffect, usePathname, Sidebar, SidebarProvider, motion, tokens, cn, DashboardContent
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
// import { motion } from "framer-motion";
// import { tokens } from "@/lib/theme";
// import { cn } from "@/lib/utils";
// import DashboardContent from "@/components/dashboard/dashboard-content";

// Import only the HomePanel, as other panels are now routed directly
import HomePanel from "@/components/dashboard/home-panel";

// Removed unused panel imports and panels map

export default function DashboardPage() {
  return <HomePanel />;
} 