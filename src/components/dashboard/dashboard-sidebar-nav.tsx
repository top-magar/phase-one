"use client";

import { IconHome, IconFileText, IconCalendarEvent, IconChartBar, IconCircleCheck, IconClock, IconCloudUpload, IconCalendarDue, IconUsers, IconUserPlus, IconSettings, IconQuestionMark, IconPlus, IconStar, IconBolt, IconBrandTabler, IconCurrencyDollar, IconVideo, IconTag, IconMail, IconDots, IconFilePlus } from "@tabler/icons-react";
import { SidebarLink } from "@/components/ui/sidebar";
import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronRight, Layout, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: <IconHome className="h-4 w-4" /> },
  { href: "/dashboard/brand-kits", label: "Brand Kits", icon: <IconFileText className="h-4 w-4" /> },
  { href: "/dashboard/templates", label: "Templates", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#2B2F38]"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="m3 7h18"/><path d="m3 15h18"/><path d="M17 3v18"/></svg> },
  { href: "/dashboard/calendar", label: "Calendar", icon: <IconCalendarEvent className="h-4 w-4" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <IconChartBar className="h-4 w-4" /> },
  { href: "/dashboard/approvals", label: "Approvals", icon: <IconCircleCheck className="h-4 w-4" /> },
];

const filesNavItems: NavItem[] = [
  { href: "/dashboard/recent", label: "Recent", icon: <IconClock className="h-3 w-3" /> },
  { href: "/dashboard/uploads", label: "Uploads", icon: <IconCloudUpload className="h-3 w-3" /> },
  { href: "/dashboard/content-calendar", label: "Content Calendar", icon: <IconCalendarDue className="h-3 w-3" /> },
];

const recentWizards = [
  { id: 1, title: "Website Product Copy", image: "/images/wiz1.jpg" },
  { id: 2, title: "Instagram Post", image: "/images/wiz2.jpg" },
  { id: 3, title: "Content Ideas", image: "/images/wiz3.jpg" },
  { id: 4, title: "Facebook Post", image: "/images/wiz4.jpg" },
  { id: 5, title: "LinkedIn Post", image: "/images/wiz5.jpg" },
  { id: 6, title: "Google Ad Copy", image: "/images/wiz6.jpg" },
  { id: 7, title: "Facebook Ad Copy", image: "/images/wiz7.jpg" },
  { id: 8, title: "X/Twitter Thread", image: "/images/wiz8.jpg" },
];

const menuItems = [
  { label: 'Recently Used', icon: <IconCircleCheck className="h-4 w-4" /> },
  { label: 'Popular',       icon: <IconStar className="h-4 w-4" /> },
  { label: 'Brainstorm Ideas', icon: <IconBolt className="h-4 w-4" /> },
  { label: 'Start Blank',    icon: <IconPlus className="h-4 w-4" /> },
  { label: 'Social Media',   icon: <IconBrandTabler className="h-4 w-4" /> },
  { label: 'Blog/SEO',       icon: <IconFileText className="h-4 w-4" /> },
  { label: 'Marketplace',    icon: <IconCurrencyDollar className="h-4 w-4" /> },
  { label: 'Video',          icon: <IconVideo className="h-4 w-4" /> },
  { label: 'Advanced Tools', icon: <IconSettings className="h-4 w-4" /> },
  { label: 'Ads',            icon: <IconTag className="h-4 w-4" /> },
  { label: 'Emails',         icon: <IconMail className="h-4 w-4" /> },
  { label: 'Other',          icon: <IconDots className="h-4 w-4" /> },
  { label: 'Upload',         icon: <IconCloudUpload className="h-4 w-4" /> },
  { label: 'New Project',    icon: <IconFilePlus className="h-4 w-4" /> },
];

export default function DashboardSidebarNav() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <aside aria-label="Sidebar" className="flex flex-col h-full w-[280px]">
        {/* Skeleton loader */}
        <div className="flex-1 px-4 py-2 m-0">
          <div className="mb-6 px-4">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[37px] w-full bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="mt-6 space-y-1">
            <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[16px] w-2/3 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-6 border-t px-4 space-y-1">
          <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[18px] w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Sidebar" className="flex flex-col h-full w-[280px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="overflow-y-auto overflow-x-hidden flex-1 py-2">
        <div className="mb-6 px-3" role="region" aria-labelledby="create-new-label">
          <h2 id="create-new-label" className="sr-only">Create New</h2>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white p-3 font-medium shadow hover:bg-gray-100 text-[14px] leading-[20px] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50">
                <Plus className="h-4 w-4" />
                Create New
              </button>
            </DialogTrigger>
            <DialogContent
              className="
                fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-[95vw] h-[85vh] max-w-6xl
                overflow-hidden rounded-[32px] bg-white shadow-2xl flex p-0
              "
            >
              {/* Left Nav */}
              <aside
                className="
                  w-64 bg-white/50 backdrop-blur-sm border-r border-gray-200
                  p-6 flex flex-col space-y-1 overflow-y-auto overflow-x-hidden
                "
              >
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={item.label}
                      className={`
                        flex w-full items-center gap-3 px-4 py-2 rounded-md transition
                        ${index === 0 ? 'bg-white shadow-sm' : 'hover:bg-white hover:shadow'}
                      `}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Main Panel */}
              <div className="flex-1 flex flex-col">
                {/* Header: search + title */}
                <header className="flex items-center px-8 py-6 border-b border-gray-200 gap-6">
                  <DialogTitle className="text-3xl font-semibold">Create New</DialogTitle>
                  <div className="relative flex-1">
                    <Search className="absolute inset-y-0 left-6 my-auto text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for wizards, Instagram, blog…"
                      className="w-full h-12 pl-14 pr-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0"
                    />
                  </div>
                </header>

                {/* Recently Used Grid */}
                <div className="p-6 overflow-auto flex-1">
                  <h3 className="text-xl font-medium mb-4">Your recently used content wizards</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {recentWizards.map((wiz) => (
                      <div
                        key={wiz.id}
                        className="relative h-40 bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-md transition"
                      >
                        <img
                          src={wiz.image}
                          alt={wiz.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/80 p-2">
                          <p className="text-sm font-medium">{wiz.title}</p>
                        </div>
                        <ChevronRight className="absolute bottom-3 right-3 h-5 w-5 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* "Start with a clean slate" Section */}
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-medium mb-4">Start with a clean slate</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { title: "Blank Design", icon: <Layout className="h-8 w-8" /> },
                      { title: "Blank Doc",    icon: <FileText className="h-8 w-8" /> },
                    ].map((card) => (
                      <button
                        key={card.title}
                        className="flex flex-col items-center justify-center h-36 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                      >
                        {card.icon}
                        <span className="mt-2 text-sm font-medium">{card.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <nav aria-label="Main navigation" className="mb-6 px-3">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarLink
                        href={item.href}
                        icon={item.icon}
                        isActive={pathname === item.href}
                        className={cn(
                          "flex items-center gap-3 h-[37px] w-full px-3 py-2 text-[14px] leading-[21px] rounded-lg transition-all duration-200",
                          "hover:bg-accent/50 focus:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
                          pathname === item.href && "bg-accent text-accent-foreground font-medium shadow-sm"
                        )}
                      >
                        {item.label}
                      </SidebarLink>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="text-xs">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="files-heading" className="mb-6 px-3">
          <h2 id="files-heading" className="text-sm font-medium mb-2 text-muted-foreground">Files & Projects</h2>
          <ul className="space-y-1">
            {filesNavItems.map((item) => (
              <li key={item.href}>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarLink 
                        href={item.href} 
                        icon={item.icon}
                        isActive={pathname === item.href}
                        className={cn(
                          "flex items-center gap-3 h-[37px] w-full px-3 py-2 text-[12px] leading-[16px] rounded-lg transition-all duration-200",
                          "hover:bg-accent/50 focus:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
                          pathname === item.href && "bg-accent text-accent-foreground font-medium shadow-sm"
                        )}
                      >
                        <span>{item.label}</span>
                      </SidebarLink>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="text-xs">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="support-heading" className="mt-auto pt-6 border-t border-border/40 px-3">
        <h2 id="support-heading" className="text-sm font-medium mb-2 text-muted-foreground">Support</h2>
        <ul className="space-y-1">
          <li>
            <SidebarLink
              href="/dashboard/join-workshop"
              icon={<IconUsers className="h-4 w-4" />}
              isActive={pathname === "/dashboard/join-workshop"}
              tooltip="Join a Workshop"
              className="flex items-center gap-3 h-[25px] w-full px-3 py-2 text-[12px] leading-[18px] transition-all duration-200 hover:bg-accent/50 rounded-lg"
            >
              Join a Workshop
            </SidebarLink>
          </li>
          <li>
            <SidebarLink
              href="/dashboard/invite-team"
              icon={<IconUserPlus className="h-4 w-4" />}
              isActive={pathname === "/dashboard/invite-team"}
              tooltip="Invite Team Members"
              className="flex items-center gap-3 h-[25px] w-full px-3 py-2 text-[12px] leading-[18px] transition-all duration-200 hover:bg-accent/50 rounded-lg"
            >
              Invite Team Members
            </SidebarLink>
          </li>
          <li>
            <SidebarLink
              href="/dashboard/integrations"
              icon={<IconSettings className="h-4 w-4" />}
              isActive={pathname === "/dashboard/integrations"}
              tooltip="Settings"
              className="flex items-center gap-3 h-[25px] w-full px-3 py-2 text-[12px] leading-[18px] transition-all duration-200 hover:bg-accent/50 rounded-lg"
            >
              Settings
            </SidebarLink>
          </li>
          <li>
            <SidebarLink
              href="/dashboard/help"
              icon={<IconQuestionMark className="h-4 w-4" />}
              isActive={pathname === "/dashboard/help"}
              tooltip="Help"
              className="flex items-center gap-3 h-[25px] w-full px-3 py-2 text-[12px] leading-[18px] transition-all duration-200 hover:bg-accent/50 rounded-lg"
            >
              Help
            </SidebarLink>
          </li>
        </ul>
      </section>
    </aside>
  );
}