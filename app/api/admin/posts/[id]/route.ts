import { NextResponse } from "next/server"
import { z } from "zod"
import axios from "axios"

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

// Create axios instance for Strapi
const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
  },
})

// Validation schema for updating posts
const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.array(z.any()).optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/admin/posts/[id] - Get a single post
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    const response = await strapiClient.get(`/posts/${id}`, {
      params: {
        populate: {
          author: true,
          categories: true,
          coverImage: true,
        },
      },
    })

    const post = response.data.data

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const transformedPost = {
      id: post.id,
      documentId: post.documentId,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage?.data?.attributes?.url
        ? post.coverImage.data.attributes.url.startsWith("http")
          ? post.coverImage.data.attributes.url
          : `${STRAPI_URL}${post.coverImage.data.attributes.url}`
        : null,
      publishedAt: post.publishedAt,
      status: post.status,
      featured: post.featured,
      author: post.author?.data
        ? {
            id: post.author.data.id,
            name: post.author.data.attributes?.name,
            slug: post.author.data.attributes?.slug,
          }
        : null,
      categories:
        post.categories?.data?.map((cat: any) => ({
          id: cat.id,
          title: cat.attributes?.title,
          slug: cat.attributes?.slug,
        })) || [],
      tags: post.tags || [],
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
    }

    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/posts/[id] - Update a post
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updatePostSchema.parse(body)

    const response = await strapiClient.put(`/posts/${id}`, {
      data: {
        ...validatedData,
        publishedAt:
          validatedData.status === "published"
            ? new Date().toISOString()
            : null,
      },
    })

    return NextResponse.json(response.data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating post:", error)
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/posts/[id] - Delete a post
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    await strapiClient.delete(`/posts/${id}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
}
