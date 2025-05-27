"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  ChevronRight,
  Settings,
  Share2,
  Search,
  ShoppingBag,
  DollarSign,
  LifeBuoy,
  Users,
  Plus,
  X
} from "lucide-react";
import AnnouncementBar from "./announcement-bar";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

const categoryPills = [
  { name: "Tools", icon: <Settings className="h-4 w-4 mr-1" /> },
  { name: "Social media", icon: <Share2 className="h-4 w-4 mr-1" /> },
  { name: "Blog/SEO", icon: <Search className="h-4 w-4 mr-1" /> },
  { name: "Marketplaces", icon: <ShoppingBag className="h-4 w-4 mr-1" /> },
  { name: "Video", icon: <Video className="h-4 w-4 mr-1" /> },
  { name: "Emails", icon: <Mail className="h-4 w-4 mr-1" /> },
  { name: "Ads", icon: <ImageIcon className="h-4 w-4 mr-1" /> },
  { name: "Website", icon: <Globe className="h-4 w-4 mr-1" /> },
  { name: "Sales", icon: <DollarSign className="h-4 w-4 mr-1" /> },
  { name: "Customer Service", icon: <LifeBuoy className="h-4 w-4 mr-1" /> },
  { name: "Recruiting", icon: <Users className="h-4 w-4 mr-1" /> },
];

export default function HomePanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for the container
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Animate each section with stagger
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out"
        });

        // Add hover animation for cards within sections
        const cards = section.querySelectorAll('.card-hover');
        cards.forEach(card => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            paused: true,
            onComplete: () => {
              gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <AnnouncementBar />
      
      <div ref={containerRef} className="space-y-8 max-h-screen overflow-y-auto px-4 pb-6">

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="flex items-center bg-white/30 backdrop-blur-md rounded-lg shadow-lg border border-white/20 px-4 py-3">
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground mr-2">
              <Plus className="h-5 w-5" />
            </Button>
            <input
              type="text"
              placeholder="What would you like to create?"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setDropdownVisible(true)}
              onBlur={() => setTimeout(() => setDropdownVisible(false), 100)}
            />
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground ml-2">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          {isDropdownVisible && (
            <div className="absolute z-10 mt-2 w-full rounded-md bg-white/90 backdrop-blur-md shadow-lg border border-white/20 p-4">
              {/* Dropdown content goes here */}
              <p className="text-sm text-muted-foreground">Start typing to see suggestions...</p>
            </div>
          )}
        </div>

        {/* Header: Create a Brand Kit */}
        <div
          ref={el => { sectionsRef.current[0] = el; }}
          className={cn(
            "rounded-lg p-6 relative overflow-hidden",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-foreground mb-2">Create a Brand Kit</h1>
            <p className="text-sm text-muted-foreground mb-6">Generate content that looks and sounds exactly like you</p>
            <Button size="lg" className="card-hover">
              Create Your First Brand Kit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <img src="/placeholder.svg?h=300&w=800&text=Background" alt="Brand Kit" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        </div>

        {/* Category Pills */}
        <div
          ref={el => { sectionsRef.current[1] = el; }}
          className={cn(
            "rounded-lg bg-white/30 backdrop-blur-md shadow-inner",
            "p-4"
          )}
        >
          <nav className="flex flex-wrap gap-2">
            {categoryPills.map((pill) => (
              <button
                key={pill.name}
                className="flex items-center px-2.5 py-1 rounded-full bg-white text-black text-xs font-medium hover:bg-gray-100 card-hover transition-colors"
                onClick={() => console.log(`Clicked: ${pill.name}`)}
              >
                {pill.icon}
                {pill.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Three Column Section: Ideas, Generate, Integrate */}
        <div
          ref={el => { sectionsRef.current[2] = el; }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >

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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Get fresh ideas</h2>
              <Button variant="ghost" size="sm" asChild><a href="#" className="text-sm text-blue-600 hover:underline">See everything you can do &rarr;</a></Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {contentCreationItems.map((item, index) => (
                <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3">
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
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Generate new content</h2>
              <Button variant="ghost" size="sm" asChild><a href="#" className="text-sm text-blue-600 hover:underline">See everything you can do &rarr;</a></Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {contentGenerationItems.map((item, index) => (
                <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner cursor-pointer hover:border-blue-500 transition-colors">
                  <CardContent className="p-0 flex flex-col">
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
              "rounded-lg p-6 mb-8",
              "bg-white/30 backdrop-blur-md shadow-lg",
              "border border-white/20"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Integrate your accounts</h2>
              <Button variant="ghost" size="sm" asChild><a href="#" className="text-sm text-blue-600 hover:underline">See everything you can do &rarr;</a></Button>
            </div>
            <div className="space-y-4">
              {integrationItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-base font-medium text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
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
            "rounded-lg p-6 mb-8",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Edit recent work</h2>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" className="text-sm text-blue-600 hover:underline">See All &rarr;</a>
              </Button>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentWorkItems.map((item, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-t-lg mb-4" />
                  <p className="text-sm font-medium text-foreground text-center">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Analyze content performance (KPI Section) */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5, timing: tokens.animations.timing.default }}
          className={cn(
            "rounded-lg p-6 mb-8",
            "bg-white/30 backdrop-blur-md shadow-lg",
            "border border-white/20"
          )}
        >
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Analyze content performance</h2>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" className="text-sm text-blue-600 hover:underline">See All &rarr;</a>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {kpiItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1, timing: tokens.animations.timing.default }}
                  className={cn(
                    "rounded-lg p-6 flex items-center gap-4",
                    "bg-white/50 backdrop-blur-sm shadow-inner hover:shadow-md transition-shadow",
                    "border border-white/20"
                  )}
                >
                  <div className="p-3 rounded-full bg-white/50 backdrop-blur-sm shadow-inner">{item.icon}</div>
                  <div>
                    <p className="text-xl font-semibold text-foreground">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </motion.div>
              ))}
               <div className={cn(
                 "flex items-center justify-center p-6 rounded-lg",
                 "bg-white/50 backdrop-blur-sm shadow-inner hover:shadow-md transition-shadow",
                 "col-span-full sm:col-span-1"
               )}>
                  <p className="text-sm text-muted-foreground text-center">See all your followers in one place</p>
               </div>
            </div>
        </motion.div>

        {/* Two Column Section: Create a month, Turn anything */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Create a month of content (Content Calendar) */}
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Create a month of content</h2>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" className="text-sm text-blue-600 hover:underline">Open Content Calendar &rarr;</a>
              </Button>
            </div>
            <div className="space-y-4">
              {contentMonthItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0 hover:bg-white/10 transition-colors rounded-lg px-2">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">{item.weekday}</p>
                      <p className="text-3xl font-bold text-foreground leading-none">{item.day}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-foreground">{item.month}</p>
                      <p className="text-sm text-muted-foreground">{item.time} &bull; {item.platform}</p>
                    </div>
                  </div>
                  <img src={item.image} alt={item.platform} className="h-10 w-10 object-cover rounded-md" />
                </div>
              ))}
            </div>
             <div className="mt-6 text-center">
                <Button variant="ghost" size="sm" asChild>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Explore All Our Tools &rarr;</a>
                </Button>
             </div>
          </motion.div>

          {/* Turn anything into anything (Transform Section) */}
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Turn anything into anything</h2>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" className="text-sm text-blue-600 hover:underline">Learn More &rarr;</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {transformItems.map((item, index) => (
                <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-inner hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <img src={item.image} alt="Transform" className="w-full h-24 object-cover rounded-md mb-4" />
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <span className="text-base font-medium text-foreground">{item.from}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-base font-medium text-foreground">{item.to}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">into new content</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="mt-6 text-center">
                <Button variant="ghost" size="sm" asChild>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Explore All Our Tools &rarr;</a>
                </Button>
             </div>
          </motion.div>

        </div>

      </div>
    </>
  );
} 