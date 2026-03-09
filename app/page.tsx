import Link from "next/link";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import CategoryNav from "@/components/CategoryNav";
import NewsletterForm from "@/components/NewsletterForm";

export const revalidate = 3600;

export default async function HomePage() {
  const allArticles = await getAllArticles();
  const featured = await getFeaturedArticles();
  const recent = allArticles.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-light border border-orange-200 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Independent reviews you can trust
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-5">
              Find the best tools<br />
              <span className="text-accent">for your business</span>
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-xl mx-auto">
              Expert reviews and side-by-side comparisons of CRM, email marketing,
              project management, AI tools, and more — so you can buy with confidence.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/category/crm"
                className="px-5 py-2.5 bg-accent text-white font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors"
              >
                Browse CRM reviews
              </Link>
              <Link
                href="/category/ai-tools"
                className="px-5 py-2.5 bg-neutral-100 text-neutral-700 font-semibold text-sm rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Explore AI Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Nav */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <CategoryNav />
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Featured Reviews</h2>
            <Link href="/articles" className="text-sm text-accent hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900">Latest Reviews</h2>
        </div>
        {recent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg">Articles coming soon.</p>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Get the best tool picks, free
          </h2>
          <p className="text-neutral-400 text-sm mb-6">
            We review 10+ tools per month so you don&apos;t have to. Join 2,400+ founders and operators.
          </p>
          <NewsletterForm />
          <p className="text-neutral-500 text-xs mt-3">No spam. Unsubscribe any time.</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 divide-x divide-neutral-200 text-center">
            {[
              { label: "Tools Reviewed", value: "150+" },
              { label: "Categories", value: "12" },
              { label: "Monthly Readers", value: "24K+" },
            ].map((stat) => (
              <div key={stat.label} className="px-4">
                <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                <div className="text-xs text-neutral-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
