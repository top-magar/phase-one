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
  Globe,
  UsersRound,
  CalendarX
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
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full p-4"
  >
    {quickStats.map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 mt-1 group-hover:text-gray-800 transition-colors duration-200">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'}`}>{stat.change}</p>
            </div>
            <div className={`p-3 rounded-xl bg-white/50 ${stat.color.replace('text-', 'bg-')} shadow-md group-hover:scale-110 transition-transform duration-200 backdrop-blur-sm`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    ))}
  </motion.div>
)

const ContentComposerHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className="h-full w-full p-4"
  >
    <SchedulePostForm />
  </motion.div>
)

const ConnectedAccountsHeader = () => {
  const isLoading = false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="grid grid-cols-1 gap-4 h-full overflow-y-auto pr-2 p-4"
    >
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 p-6 rounded-xl bg-white/50 shadow-sm animate-pulse">
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-6 w-12 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      ) : connectedAccounts.length > 0 ? (
        connectedAccounts.map((account, index) => (
          <motion.div
            key={account.platform}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`relative p-3 rounded-xl ${account.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <account.icon className="h-6 w-6 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{account.platform}</h3>
                  <p className="text-sm text-gray-500">{account.handle}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 transition-transform duration-300 group-hover:scale-105">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/50 p-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/80">
                <p className="text-sm font-medium text-gray-500">Followers</p>
                <p className="mt-1 text-xl font-bold text-gray-900">{account.followers}</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-white/50 p-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/80">
                <p className="text-sm font-medium text-gray-500">Engagement</p>
                <p className="mt-1 text-xl font-bold text-gray-900">{account.engagement}</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-4 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center p-4">
          <UsersRound className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-lg font-semibold text-gray-700 mb-1">No Social Accounts Connected Yet</p>
          <p className="text-sm text-gray-500 mb-4">Connect your Facebook and Instagram accounts to start managing your social media!</p>
        </div>
      )}
    </motion.div>
  )
}

const ScheduledPostsHeader = () => {
  const isLoading = false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="space-y-4 h-full w-full overflow-y-auto pr-2 p-4"
    >
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-white/50 shadow-sm animate-pulse">
              <div className="h-10 w-10 bg-gray-300 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="h-4 w-8 bg-gray-300 rounded"></div>
                  <div className="h-4 w-8 bg-gray-300 rounded"></div>
                  <div className="h-4 w-8 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      ) : scheduledPosts.length > 0 ? (
        scheduledPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl ${ post.platform === "facebook"
                        ? "bg-blue-600"
                        : "bg-gradient-to-tr from-purple-500 to-pink-500"
                    } shadow-md`}
                  >
                    {post.platform === "facebook" ? (
                      <Facebook className="h-5 w-5 text-white" />
                    ) : (
                      <Instagram className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                     <Badge
                      variant={post.status === "published" ? "default" : "secondary"}
                      className={
                        post.status === "published" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"
                      }
                    >
                      {post.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      {post.date} at {post.scheduledTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-purple-600">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-900 mb-4 line-clamp-3">{post.content}</p>

              {post.status === "published" && (
                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Heart className="h-4 w-4 text-red-500" />
                    {post.engagement.likes}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    {post.engagement.comments}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Share className="h-4 w-4 text-green-500" />
                    {post.engagement.shares}
                  </span>
                </div>
              )}
            </div>
           <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        ))
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center p-4">
          <CalendarX className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-lg font-semibold text-gray-700 mb-1">No Posts Scheduled</p>
          <p className="text-sm text-gray-500 mb-4">Use the AI Content Composer to create and schedule your first post!</p>
        </div>
      )}
    </motion.div>
  )
}

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

          <BentoGrid className="max-w-7xl mx-auto md:grid-cols-3 gap-4">
            {/* Row 1 */}
            <BentoGridItem
              title="Quick Stats"
              description="Overview of your social media performance"
              header={<QuickStatsHeader />}
              className="md:col-span-2 border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm"
              icon={<BarChart3 className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Connected Accounts"
              description="Manage your social media accounts"
              header={<ConnectedAccountsHeader />}
              className="md:col-span-1 border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm"
              icon={<Users className="h-4 w-4 text-neutral-500" />}
            />

            {/* Row 2 */}
            <BentoGridItem
              title="AI Content Composer"
              description="Create engaging content with AI assistance"
              header={<ContentComposerHeader />}
              className="md:col-span-2 border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm"
              icon={<Sparkles className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Scheduled Posts"
              description="View and manage your scheduled content"
              header={<ScheduledPostsHeader />}
              className="md:col-span-1 border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm"
              icon={<Clock className="h-4 w-4 text-neutral-500" />}
            />
          </BentoGrid>
        </div>
      </main>
    </div>
  )
} 