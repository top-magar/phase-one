"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { tokens } from "@/lib/theme";
import {
  ArrowRight,
  BookOpen,
  Image as ImageIcon,
  Mail,
  Globe,
  Clipboard,
  Calendar as CalendarIcon,
  Folder,
  Clock as ClockIcon,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Music,
  Video,
  FileText,
  ChevronRight
} from "lucide-react";

// Placeholder data (can be replaced with actual data later)
const recentWorkItems = [
  {
    title: "Instagram Post",
    image: "/placeholder.svg?h=300&w=400&text=Instagram",
  },
  {
    title: "Facebook Ad",
    image: "/placeholder.svg?h=300&w=400&text=Facebook",
  },
  {
    title: "Twitter Thread",
    image: "/placeholder.svg?h=300&w=400&text=Twitter",
  },
  {
    title: "LinkedIn Article",
    image: "/placeholder.svg?h=300&w=400&text=LinkedIn",
  },
];

const contentCreationItems = [
  { title: 'Social Media Ideas', icon: <ImageIcon className="h-8 w-8 text-primary" /> },
  { title: 'Blog Ideas', icon: <BookOpen className="h-8 w-8 text-primary" /> },
  { title: 'Newsletter Ideas', icon: <Mail className="h-8 w-8 text-primary" /> },
  { title: 'Content Plan', icon: <Clipboard className="h-8 w-8 text-primary" /> },
];

const contentGenerationItems = [
  {
    title: "Social Post",
    image: "/placeholder.svg?h=200&w=400&text=Social+Post",
  },
  {
    title: "Blog Post",
    image: "/placeholder.svg?h=200&w=400&text=Blog+Post",
  },
  {
    title: "Email",
    image: "/placeholder.svg?h=200&w=400&text=Email",
  },
  {
    title: "Ad Copy",
    image: "/placeholder.svg?h=200&w=400&text=Ad+Copy",
  },
];

const integrationItems = [
  { label: "Facebook", href: "/connect/facebook", icon: <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6" /> },
  { label: "Instagram", href: "/connect/instagram", icon: <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6" /> },
  { label: "TikTok", href: "/connect/tiktok", icon: <img src="/icons/tiktok.svg" alt="TikTok" className="h-6 w-6" /> },
  { label: "X/Twitter", href: "/connect/twitter", icon: <img src="/icons/x.svg" alt="X/Twitter" className="h-6 w-6" /> },
  { label: "LinkedIn", href: "/connect/linkedin", icon: <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" /> },
];

const kpiItems = [
  { label: 'Hours Saved', value: '2h', icon: <ClockIcon className="h-5 w-5 text-primary" /> },
  { label: 'Files Created', value: '22', icon: <Folder className="h-5 w-5 text-primary" /> },
];

const contentMonthItems = [
  {
    weekday: "Mon",
    day: "15",
    month: "May 2024",
    time: "9:00 AM",
    platform: "Instagram",
    image: "/placeholder.svg?h=100&w=100&text=IG",
  },
  {
    weekday: "Wed",
    day: "17",
    month: "May 2024",
    time: "2:00 PM",
    platform: "Facebook",
    image: "/placeholder.svg?h=100&w=100&text=FB",
  },
  {
    weekday: "Fri",
    day: "19",
    month: "May 2024",
    time: "11:00 AM",
    platform: "Twitter",
    image: "/placeholder.svg?h=100&w=100&text=TW",
  },
];

const transformItems = [
  { from: 'Video', to: 'Content', icon: <Video className="h-6 w-6 text-primary" />, image: '/placeholder.svg?h=150&w=200' },
  { from: 'Audio', to: 'Content', icon: <Music className="h-6 w-6 text-primary" />, image: '/placeholder.svg?h=150&w=200' },
  { from: 'Website', to: 'Content', icon: <Globe className="h-6 w-6 text-primary" />, image: '/placeholder.svg?h=150&w=200' },
  { from: 'Doc', to: 'Content', icon: <FileText className="h-6 w-6 text-primary" />, image: '/placeholder.svg?h=150&w=200' },
];

const tutorialItems = [
  { title: 'Blaze Overview', duration: '01:17', image: '/placeholder.svg?h=100&w=150' },
  { title: 'Blaze 101 Webinar & Demo', duration: '1:28:01', image: '/placeholder.svg?h=100&w=150' },
  { title: 'How to use the Blaze Desi...', duration: '05:56', image: '/placeholder.svg?h=100&w=150' },
  { title: 'Planning a Month of Cont...', duration: '02:57', image: '/placeholder.svg?h=100&w=150' },
  { title: 'How to Schedule a r...', duration: '02:57', image: '/placeholder.svg?h=100&w=150' },
];

export default function HomePanel() {
  return (
    <div className="space-y-8 max-h-screen overflow-y-auto px-4 py-6">

      {/* Header: Create a Brand Kit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, timing: tokens.animations.timing.default }}
        className={cn(
          "rounded-lg p-6 relative overflow-hidden",
          "bg-white/30 backdrop-blur-md shadow-lg",
          "border border-white/20"
        )}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">Create a Brand Kit</h1>
          <p className="text-sm text-muted-foreground mb-6">Generate content that looks and sounds exactly like you</p>
          <Button size="lg">
            Create Your First Brand Kit <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {/* Background image placeholder */}
        <img src="/placeholder.svg?h=300&w=800&text=Background" alt="Brand Kit" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      </motion.div>

      {/* Category Pills */}
      <div className={cn(
        "rounded-lg bg-white/30 backdrop-blur-md shadow-inner",
        "p-4 flex flex-wrap gap-2"
      )}>
        <nav className="flex flex-wrap gap-2">
          {[
            "Tools",
            "Social media",
            "Blog/SEO",
            "Marketplaces",
            "Video",
            "Emails",
            "Ads",
            "Website",
            "Sales",
            "Customer Service",
            "Recruiting"
          ].map((pill) => (
            <button
              key={pill}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm text-sm font-medium hover:bg-white/70"
            >
              {pill}
            </button>
          ))}
        </nav>
      </div>

      {/* Three Column Section: Ideas, Generate, Integrate */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Get fresh ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, timing: tokens.animations.timing.default }}
          className={cn(
            "rounded-lg p-6",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Get fresh ideas</h2>
            <Button variant="ghost" size="sm" asChild><a href="#">See everything you can do &rarr;</a></Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {contentCreationItems.map((item, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Generate new content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, timing: tokens.animations.timing.default }}
          className={cn(
            "rounded-lg p-6",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
           <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Generate new content</h2>
            <Button variant="ghost" size="sm" asChild><a href="#">See everything you can do &rarr;</a></Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {contentGenerationItems.map((item, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner">
                <CardContent className="p-0">
                  <img src={item.image} alt={item.title} className="w-full h-24 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <p className="text-sm font-medium text-foreground text-center">{item.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Integrate your accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3, timing: tokens.animations.timing.default }}
          className={cn(
            "rounded-lg p-6",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Integrate your accounts</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Post, analyze, optimize, repeat</p>
          <div className="space-y-3">
            {integrationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-between hover:bg-white/50"
                asChild
              >
                <a href={item.href} className="flex items-center">
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="text-foreground text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </Button>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Edit recent work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4, timing: tokens.animations.timing.default }}
        className={cn(
          "rounded-lg p-6",
          "bg-white/30 backdrop-blur-md shadow-lg",
          "border border-white/20"
        )}
      >
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Edit recent work</h2>
            {/* Placeholder for See All button if needed */}
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {recentWorkItems.map((item, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner">
              <CardContent className="p-0">
                <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-t-lg" />
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground text-center">{item.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Analyze content performance */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5, timing: tokens.animations.timing.default }}
        className={cn(
          "rounded-lg p-6",
          "bg-white/30 backdrop-blur-md shadow-lg",
          "border border-white/20"
        )}
      >
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Analyze content performance</h2>
             <Button variant="ghost" size="sm" asChild><a href="#">See All &rarr;</a></Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {kpiItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                 <div className={cn(
                    "p-3 rounded-full",
                    "bg-primary/10"
                  )}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
              </div>
            ))}
             {/* Placeholder for followers chart/info */}
             <div className={cn(
               "flex items-center justify-center p-4 rounded-lg",
               "bg-white/50 backdrop-blur-sm shadow-inner",
                "col-span-full sm:col-span-1"
             )}>
                <p className="text-sm text-muted-foreground text-center">See all your followers in one place</p>
             </div>
          </div>
      </motion.div>

      {/* Two Column Section: Create a month, Turn anything */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Create a month of content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6, timing: tokens.animations.timing.default }}
          className={cn(
            "rounded-lg p-6",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Create a month of content</h2>
             <Button variant="ghost" size="sm" asChild><a href="#">Open Content Calendar &rarr;</a></Button>
          </div>
          <div className="space-y-4">
            {contentMonthItems.map((item, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0 text-center">
                    <p className="text-xs font-medium text-muted-foreground">{item.weekday}</p>
                    <p className="text-2xl font-bold text-foreground">{item.day}</p>
                    <p className="text-xs text-muted-foreground">{item.month.split(' ')[0]}</p>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div className="flex-1 flex items-center space-x-4">
                     <img src={item.image} alt={item.platform} className="w-12 h-12 object-cover rounded-lg" />
                     <div>
                        <p className="text-sm font-medium text-foreground">{item.time}</p>
                        <p className="text-xs text-muted-foreground">{item.platform}</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" asChild><a href="#">Explore All Our Tools &rarr;</a></Button>
           </div>
        </motion.div>

        {/* Turn anything into anything */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7, timing: tokens.animations.timing.default }}
          className={cn(
            "rounded-lg p-6",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Turn anything into anything</h2>
            {/* Placeholder for help icon if needed */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {transformItems.map((item, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner">
                <CardContent className="p-4 text-center">
                  <div className="mb-2 flex justify-center items-center">
                      {item.icon}
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.from} &rarr; {item.to}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" asChild><a href="#">Explore All Our Tools &rarr;</a></Button>
           </div>
        </motion.div>

      </div>

      

    </div>
  );
} 