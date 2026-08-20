import { notFound } from "next/navigation"
import { Link } from "@/i18n/routing"
import { Footer } from "@/components/footer"
import { getNewsArticle, newsArticles, type ArticleBlock } from "@/lib/news-articles"

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: string }>
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) {
    return { title: "Not Found" }
  }

  return {
    title: `${article.title} | SLOANE / Adler`,
    description: article.excerpt,
  }
}

function splitListItem(item: string): [string, string] {
  const separatorIndex = item.indexOf(". ")
  if (separatorIndex === -1) return [item, ""]
  return [item.slice(0, separatorIndex + 1), item.slice(separatorIndex + 2)]
}

function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={index} className="font-serif text-2xl sm:text-3xl text-[#1a2332] pt-6">
              {block.text}
            </h2>
          )
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-4">
              {block.items.map((item, itemIndex) => {
                const [lead, rest] = splitListItem(item)
                return (
                  <li key={itemIndex} className="text-slate-600 leading-relaxed pl-6 border-l border-slate-200">
                    <span className="text-[#1a2332] font-medium">{lead}</span>
                    {rest ? " " + rest : ""}
                  </li>
                )
              })}
            </ul>
          )
        }

        return (
          <p key={index} className="text-slate-600 leading-relaxed">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

export default async function NewsArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      <main className="pt-32 pb-24 px-8">
        <article className="max-w-2xl mx-auto">
          <Link
            href="/news"
            className="text-sm text-slate-500 hover:text-[#1a2332] transition-colors mb-12 inline-block uppercase tracking-wider"
          >
            ← Back to News
          </Link>

          <header className="mb-12">
            <time className="block text-xs uppercase tracking-widest text-slate-500 mb-6">{article.date}</time>
            <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-balance mb-6">{article.title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>
          </header>

          <ArticleContent blocks={article.content} />
        </article>
      </main>

      <Footer />
    </div>
  )
}
