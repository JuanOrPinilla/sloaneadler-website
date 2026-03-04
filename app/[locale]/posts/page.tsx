import { sanityClient, queries, getSanityImageUrl } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'News & Insights | SLOANE / Adler',
  description: 'Perspectives on capital, stewardship, and governance.',
}

export default async function PostsPage() {
  const posts = await sanityClient.fetch(queries.allPosts)

  return (
    <main className="min-h-screen bg-white text-[#1a2332] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Perspectives
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Observations on capital, stewardship, and the long view.
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-12">
          {posts?.map((post: any) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>

        {posts?.length === 0 && (
          <div className="text-center py-16 border-t border-slate-200">
            <p className="text-slate-500">No perspectives published yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}

function PostItem({ post }: { post: any }) {
  return (
    <article className="group border-b border-slate-200 pb-12">
      <Link href={`/posts/${post.slug.current}`} className="block">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 text-xs text-slate-500 uppercase tracking-wider mb-3">
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              {post.categories?.[0] && (
                <span className="text-[#b8a07e]">{post.categories[0].title}</span>
              )}
            </div>
            <h2 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-slate-600 transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-slate-600 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
          <div className="hidden md:block text-slate-400 group-hover:text-[#1a2332] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}
