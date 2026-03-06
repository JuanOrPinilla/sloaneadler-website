import { getPostBySlug } from '@/lib/strapi'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StrapiBlocksRenderer } from '@/components/strapi-blocks-renderer'

interface PostPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Not Found' }
  }

  return {
    title: post.metaTitle || `${post.title} | SLOANE / Adler`,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white text-[#1a2332] pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-8">
        {/* Back Link */}
        <Link
          href="/posts"
          className="text-sm text-slate-500 hover:text-[#1a2332] transition-colors mb-12 inline-block uppercase tracking-wider"
        >
          ← Back to Perspectives
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs text-slate-500 uppercase tracking-wider mb-6">
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            {post.categories?.map((cat) => (
              <span key={cat.slug} className="text-[#b8a07e]">
                {cat.title}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-slate-600 leading-relaxed font-serif">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[16/9] mb-12 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none font-serif">
          {post.content && <StrapiBlocksRenderer content={post.content} />}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200">
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs uppercase tracking-wider border border-slate-200 text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author */}
        {post.author && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Written by</p>
            <p className="font-serif text-lg">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-slate-600 mt-2">{post.author.bio}</p>
            )}
          </div>
        )}
      </article>
    </main>
  )
}
