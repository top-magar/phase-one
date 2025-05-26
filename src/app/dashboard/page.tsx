"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from "@/components/ui/sidebar"
import {
  Home,
  Clock,
  FileText,
  BarChart3,
  Users,
  Settings,
  Plus,
  Sparkles,
  Facebook,
  Instagram,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  CheckCircle,
  ImageIcon,
  Video,
  Edit3,
  Calendar,
  Eye,
  Target,
  Zap,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SchedulePostForm } from '@/components/SchedulePostForm'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { motion } from "motion/react"

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: <Home /> },
  { label: "Schedule", href: "/dashboard/schedule", icon: <Clock /> },
  { label: "Content", href: "/dashboard/content", icon: <FileText /> },
  { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 /> },
  { label: "Accounts", href: "/dashboard/accounts", icon: <Users /> },
  { label: "Settings", href: "/dashboard/settings", icon: <Settings /> }
]

const scheduledPosts = [
  {
    id: 1,
    content:
      "🎉 Exciting news! Our new winter collection is launching this Friday. Get ready for amazing deals and cozy styles perfect for Kathmandu weather! #WinterCollection #Nepal #Fashion",
    platform: "facebook",
    scheduledTime: "2:00 PM",
    date: "Today",
    status: "scheduled",
    engagement: { likes: 0, comments: 0, shares: 0 },
    image: "/placeholder.svg?height=60&width=60",
    type: "image",
  },
  {
    id: 2,
    content:
      "Beautiful sunrise from Kathmandu valley this morning! ☀️ Starting the day with gratitude and positive energy. What's inspiring you today? #Kathmandu #Morning #Inspiration",
    platform: "instagram",
    scheduledTime: "6:00 AM",
    date: "Tomorrow",
    status: "scheduled",
    engagement: { likes: 0, comments: 0, shares: 0 },
    image: "/placeholder.svg?height=60&width=60",
    type: "image",
  },
  {
    id: 3,
    content:
      "Customer testimonial: 'Best service in town! Professional, reliable, and always delivers on time.' Thank you for trusting us with your business! 🙏 #CustomerLove #Testimonial #Nepal",
    platform: "facebook",
    scheduledTime: "11:00 AM",
    date: "Dec 28",
    status: "published",
    engagement: { likes: 47, comments: 12, shares: 8 },
    image: "/placeholder.svg?height=60&width=60",
    type: "text",
  },
]

const connectedAccounts = [
  {
    platform: "Facebook",
    icon: Facebook,
    status: "connected",
    followers: "2,847",
    handle: "@phaseonenepal",
    color: "bg-blue-600",
    engagement: "6.8%",
    lastPost: "2 hours ago",
  },
  {
    platform: "Instagram",
    icon: Instagram,
    status: "connected",
    followers: "1,923",
    handle: "@phaseonenepal",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    engagement: "8.2%",
    lastPost: "5 hours ago",
  },
]

const quickStats = [
  {
    title: "Engagement Rate",
    value: "7.5%",
    change: "+2.3%",
    changeType: "positive",
    icon: Heart,
    color: "text-teal-600",
    description: "Average across all platforms",
    details: {
      facebook: "6.8%",
      instagram: "8.2%",
      trend: "Up 2.3% from last week",
      peakTime: "6 PM NPT",
    },
  },
  {
    title: "Scheduled Posts",
    value: "15",
    change: "5 today",
    changeType: "neutral",
    icon: Clock,
    color: "text-purple-600",
    description: "Next post in 2 hours",
    details: {
      today: 5,
      tomorrow: 7,
      nextWeek: 3,
      pendingApproval: 2,
    },
  },
]

const QuickStatsHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
  >
    {quickStats.map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card 
          className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 group h-full"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gray-50 ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </motion.div>
)

const ContentComposerHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className="p-4"
  >
    <SchedulePostForm />
  </motion.div>
)

const ConnectedAccountsHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.3 }}
    className="space-y-4 p-4"
  >
    {connectedAccounts.map((account, index) => (
      <motion.div
        key={account.platform}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="p-4 border border-gray-100 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${account.color} shadow-sm`}>
              <account.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{account.platform}</p>
              <p className="text-sm text-gray-500">{account.handle}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Followers</p>
            <p className="font-semibold text-gray-900">{account.followers}</p>
          </div>
          <div>
            <p className="text-gray-500">Engagement</p>
            <p className="font-semibold text-gray-900">{account.engagement}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
)

const ScheduledPostsHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.4 }}
    className="space-y-4 p-4"
  >
    {scheduledPosts.map((post, index) => (
      <motion.div
        key={post.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-white/50 transition-all duration-200 group"
      >
        <div className="flex-shrink-0">
          <div
            className={`p-2.5 rounded-xl ${
              post.platform === "facebook"
                ? "bg-blue-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500"
            } shadow-sm`}
          >
            {post.platform === "facebook" ? (
              <Facebook className="h-4 w-4 text-white" />
            ) : (
              <Instagram className="h-4 w-4 text-white" />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge
                variant={post.status === "published" ? "default" : "secondary"}
                className={
                  post.status === "published" ? "bg-green-100 text-green-700 border-green-200" : ""
                }
              >
                {post.status}
              </Badge>
              <span className="text-sm text-gray-500">
                {post.date} at {post.scheduledTime}
              </span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-900 mb-3 line-clamp-2">{post.content}</p>
          {post.status === "published" && (
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-red-500" />
                {post.engagement.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3 text-blue-500" />
                {post.engagement.comments}
              </span>
              <span className="flex items-center gap-1">
                <Share className="h-3 w-3 text-green-500" />
                {post.engagement.shares}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    ))}
  </motion.div>
)

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-gray-50/50">
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-2 pt-6">
            {navigationItems.map((item) => (
              <SidebarLink key={item.href} link={item} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your social media presence.</p>
          </motion.div>

          <BentoGrid className="max-w-7xl mx-auto gap-4">
            <BentoGridItem
              title="Quick Stats"
              description="Overview of your social media performance"
              header={<QuickStatsHeader />}
              className="md:col-span-2 lg:col-span-2"
            />
            <BentoGridItem
              title="AI Content Composer"
              description="Create engaging content with AI assistance"
              header={<ContentComposerHeader />}
              className="md:col-span-2 lg:col-span-2"
            />
            <BentoGridItem
              title="Connected Accounts"
              description="Manage your social media accounts"
              header={<ConnectedAccountsHeader />}
              className="md:col-span-1 lg:col-span-1"
            />
            <BentoGridItem
              title="Scheduled Posts"
              description="View and manage your scheduled content"
              header={<ScheduledPostsHeader />}
              className="md:col-span-1 lg:col-span-1"
            />
          </BentoGrid>
        </div>
      </main>
    </div>
  )
} 