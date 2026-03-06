"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Bold, Italic, Link, List, ListOrdered, Heading1, Heading2, Quote, Code } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

interface PostEditorProps {
  formData: PostFormData
  onChange: (data: PostFormData) => void
  generateSlug: (title: string) => string
}

// Toolbar button component
interface ToolbarButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
}

function ToolbarButton({ icon, label, onClick, active }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`p-2 transition-colors ${
        active
          ? "bg-[#1a2332] text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {icon}
    </button>
  )
}

export function PostEditor({ formData, onChange, generateSlug }: PostEditorProps) {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [tagInput, setTagInput] = useState("")

  const updateField = <K extends keyof PostFormData>(
    field: K,
    value: PostFormData[K]
  ) => {
    onChange({ ...formData, [field]: value })
  }

  const handleTitleChange = (title: string) => {
    const newSlug = formData.slug === generateSlug(formData.title) 
      ? generateSlug(title) 
      : formData.slug
    onChange({ ...formData, title, slug: newSlug })
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      updateField("tags", [...formData.tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateField(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    )
  }

  // Simple rich text formatting (basic implementation)
  const insertFormat = (format: string) => {
    // This is a simplified implementation
    // In a real app, you'd use a proper rich text editor like Slate or TipTap
    console.log(`Insert ${format}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#1a2332]">
              Content
            </CardTitle>
            <CardDescription>Write your post content here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Post title"
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="post-url-slug"
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder="Brief description of the post..."
                className="border-slate-300 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              {/* Rich Text Toolbar */}
              <div className="border border-slate-200 border-b-0 bg-slate-50 p-2 flex flex-wrap gap-1">
                <ToolbarButton
                  icon={<Bold className="w-4 h-4" />}
                  label="Bold"
                  onClick={() => insertFormat("bold")}
                  active={activeFormats.has("bold")}
                />
                <ToolbarButton
                  icon={<Italic className="w-4 h-4" />}
                  label="Italic"
                  onClick={() => insertFormat("italic")}
                  active={activeFormats.has("italic")}
                />
                <div className="w-px h-6 bg-slate-300 mx-1" />
                <ToolbarButton
                  icon={<Heading1 className="w-4 h-4" />}
                  label="Heading 1"
                  onClick={() => insertFormat("heading-1")}
                />
                <ToolbarButton
                  icon={<Heading2 className="w-4 h-4" />}
                  label="Heading 2"
                  onClick={() => insertFormat("heading-2")}
                />
                <div className="w-px h-6 bg-slate-300 mx-1" />
                <ToolbarButton
                  icon={<List className="w-4 h-4" />}
                  label="Bullet List"
                  onClick={() => insertFormat("unordered-list")}
                />
                <ToolbarButton
                  icon={<ListOrdered className="w-4 h-4" />}
                  label="Numbered List"
                  onClick={() => insertFormat("ordered-list")}
                />
                <div className="w-px h-6 bg-slate-300 mx-1" />
                <ToolbarButton
                  icon={<Quote className="w-4 h-4" />}
                  label="Quote"
                  onClick={() => insertFormat("quote")}
                />
                <ToolbarButton
                  icon={<Code className="w-4 h-4" />}
                  label="Code"
                  onClick={() => insertFormat("code")}
                />
                <ToolbarButton
                  icon={<Link className="w-4 h-4" />}
                  label="Link"
                  onClick={() => insertFormat("link")}
                />
              </div>
              {/* Content Editor - Simplified as textarea for now */}
              <Textarea
                value={
                  typeof formData.content === "string"
                    ? formData.content
                    : JSON.stringify(formData.content, null, 2)
                }
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value)
                    updateField("content", parsed)
                  } catch {
                    // If not valid JSON, store as string temporarily
                    updateField("content", e.target.value as unknown as StrapiBlock[])
                  }
                }}
                placeholder="Write your post content..."
                className="border-slate-300 min-h-[400px] font-mono text-sm"
              />
              <p className="text-xs text-slate-500">
                Note: This editor accepts JSON format for Strapi blocks. Format: {"[{"}type:&quot;paragraph&quot;,children:[{"{text:"}&quot;Your text&quot;{"}]}]"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Publishing Options */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-[#1a2332]">
              Publishing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Featured Post</Label>
                <p className="text-xs text-slate-500">
                  Highlight on homepage
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  updateField("featured", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status">Status</Label>
                <p className="text-xs text-slate-500">
                  {formData.status === "published" ? "Live on site" : "Not visible"}
                </p>
              </div>
              <span
                className={`text-sm font-medium ${
                  formData.status === "published"
                    ? "text-green-600"
                    : "text-amber-600"
                }`}
              >
                {formData.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-[#1a2332]">
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Add a tag"
                className="border-slate-300"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className="border-slate-300"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-[#1a2332]">
              SEO
            </CardTitle>
            <CardDescription>Search engine optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
                placeholder="SEO title"
                className="border-slate-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={formData.metaDescription}
                onChange={(e) =>
                  updateField("metaDescription", e.target.value)
                }
                placeholder="SEO description"
                className="border-slate-300 min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Need to import Button here to avoid circular dependency
import { Button } from "@/components/ui/button"
