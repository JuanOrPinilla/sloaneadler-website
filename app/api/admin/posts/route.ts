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

// Validation schema for creating posts
const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.array(z.any()).optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

// GET /api/admin/posts - List all posts
export async function GET() {
  try {
    const response = await strapiClient.get("/posts", {
      params: {
        sort: ["publishedAt:desc"],
        populate: {
          author: true,
          categories: true,
          coverImage: true,
        },
        pagination: {
          pageSize: 100,
        },
      },
    })

    const posts = response.data.data.map((post: any) => ({
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
    }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}

// POST /api/admin/posts - Create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = createPostSchema.parse(body)

    const response = await strapiClient.post("/posts", {
      data: {
        ...validatedData,
        publishedAt:
          validatedData.status === "published" ? new Date().toISOString() : null,
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

    console.error("Error creating post:", error)
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    )
  }
}
