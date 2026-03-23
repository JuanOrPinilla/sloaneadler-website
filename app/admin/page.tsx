"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  FileText,
  TrendingUp,
  Eye,
  Calendar,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { TransformedPost } from "@/lib/strapi"

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  featuredPosts: number
  recentPosts: TransformedPost[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0,
    recentPosts: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/posts")
        if (response.ok) {
          const posts: TransformedPost[] = await response.json()
          const publishedPosts = posts.filter((p) => p.status === "published")
          const draftPosts = posts.filter((p) => p.status === "draft")
          const featuredPosts = posts.filter((p) => p.featured)

          setStats({
            totalPosts: posts.length,
            publishedPosts: publishedPosts.length,
            draftPosts: draftPosts.length,
            featuredPosts: featuredPosts.length,
            recentPosts: posts.slice(0, 5),
          })
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      description: "All posts in the system",
    },
    {
      title: "Published",
      value: stats.publishedPosts,
      icon: TrendingUp,
      description: "Live on the site",
    },
    {
      title: "Drafts",
      value: stats.draftPosts,
      icon: Eye,
      description: "Awaiting publication",
    },
    {
      title: "Featured",
      value: stats.featuredPosts,
      icon: Calendar,
      description: "Highlighted posts",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#1a2332]">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Manage your content and view analytics
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">
            <FileText className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {card.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif text-[#1a2332]">
                  {card.value}
                </div>
                <p className="text-xs text-slate-500 mt-1">{card.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Posts */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-serif text-xl text-[#1a2332]">
              Recent Posts
            </CardTitle>
            <CardDescription>Latest content updates</CardDescription>
          </div>
          <Link href="/admin/posts">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {stats.recentPosts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No posts yet. Create your first post to get started.</p>
              <Link href="/admin/posts/new" className="inline-block mt-4">
                <Button variant="outline">Create Post</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#1a2332] truncate">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {post.status}
                      </span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      {post.featured && (
                        <span className="text-amber-600">Featured</span>
                      )}
                    </div>
                  </div>
                  <Link href={`/admin/posts/${post.documentId}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
