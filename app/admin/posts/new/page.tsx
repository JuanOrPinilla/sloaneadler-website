"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Link } from "@/i18n/routing"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostEditor } from "@/components/admin/post-editor"
import type { StrapiBlock } from "@/lib/strapi"

interface PostFormData {
  title: string
  slug: string
  excerpt: string
  content: StrapiBlock[]
  status: "draft" | "published"
  featured: boolean
  metaTitle: string
  metaDescription: string
  tags: string[]
}

const initialFormData: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: [
    {
      type: "paragraph",
      children: [{ type: "text", text: "" }],
    },
  ],
  status: "draft",
  featured: false,
  metaTitle: "",
  metaDescription: "",
  tags: [],
}

export default function NewPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<PostFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (publish = false) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const dataToSubmit = {
        ...formData,
        status: publish ? "published" : "draft",
      }

      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (response.ok) {
        const data = await response.json()
        router.push("/admin/posts")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to create post")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error creating post:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/posts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#1a2332]">New Post</h1>
          <p className="text-slate-500 mt-1">Create a new blog post</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="border-slate-300"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="bg-[#1a2332] hover:bg-[#2a3342] text-white"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Publish
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">
          {error}
        </div>
      )}

      <PostEditor
        formData={formData}
        onChange={setFormData}
        generateSlug={generateSlug}
      />
    </div>
  )
}
