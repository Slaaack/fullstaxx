import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import CategoryNav from "@/components/CategoryNav";

const CATEGORY_MAP: Record<string, string> = {
  crm: "CRM",
  "email-marketing": "Email Marketing",
  "project-management": "Project Management",
  scheduling: "Scheduling",
  "ai-tools": "AI Tools",
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const displayName = CATEGORY_MAP[params.category];
  if (!displayName) return {};
  return {
    title: `Best ${displayName} Tools — Reviews & Comparisons`,
    description: `Independent reviews and comparisons of the best ${displayName} software. Find the right tool for your business.`,
    alternates: {
      canonical: `https://fullstaxx.com/category/${params.category}`,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const displayName = CATEGORY_MAP[params.category];
  if (!displayName) notFound();

  const articles = getArticlesByCategory(displayName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category nav */}
      <div className="mb-8">
        <CategoryNav />
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Best {displayName} Tools
        </h1>
        <p className="text-neutral-500">
          {articles.length} review{articles.length !== 1 ? "s" : ""} in this category
        </p>
      </header>

      {/* Articles */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-lg font-medium text-neutral-600">Coming soon</p>
          <p className="text-sm mt-1">We&apos;re working on {displayName} reviews. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
