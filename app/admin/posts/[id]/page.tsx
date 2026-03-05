"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Link } from "@/i18n/routing"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostEditor } from "@/components/admin/post-editor"
import type { StrapiBlock, TransformedPost } from "@/lib/strapi"

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

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const [postId, setPostId] = useState<string | null>(null)
  const [formData, setFormData] = useState<PostFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { id } = await params
      setPostId(id)
      fetchPost(id)
    }
    init()
  }, [params])

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/posts/${id}`)
      if (response.ok) {
        const post: TransformedPost = await response.json()
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          content: post.content || [
            {
              type: "paragraph",
              children: [{ type: "text", text: "" }],
            },
          ],
          status: post.status,
          featured: post.featured,
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
          tags: post.tags || [],
        })
      } else {
        setError("Failed to load post")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error fetching post:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (publish = false) => {
    if (!postId || !formData) return

    setIsSubmitting(true)
    setError(null)

    try {
      const dataToSubmit = {
        ...formData,
        status: publish ? "published" : "draft",
      }

      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (response.ok) {
        router.push("/admin/posts")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to update post")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error updating post:", err)
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a2332]" />
      </div>
    )
  }

  if (error || !formData) {
    return (
      <div className="space-y-6">
        <Link href="/admin/posts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">
          {error || "Post not found"}
        </div>
      </div>
    )
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
          <h1 className="font-serif text-3xl text-[#1a2332]">Edit Post</h1>
          <p className="text-slate-500 mt-1">Update your blog post</p>
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
            {formData.status === "published" ? "Update" : "Publish"}
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
