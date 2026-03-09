import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";
import { formatDate, getCategoryColor } from "@/lib/utils";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import AffiliateButton from "@/components/AffiliateButton";
import TableOfContents from "@/components/TableOfContents";
import ComparisonTable from "@/components/ComparisonTable";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const { frontmatter } = article;
  const ogImage = `https://i.snapog.com/?title=${encodeURIComponent(frontmatter.title)}&description=${encodeURIComponent(frontmatter.description)}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `https://fullstaxx.com/articles/${params.slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
  };
}

const mdxComponents = {
  ComparisonTable,
  AffiliateButton,
};

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Fullstaxx",
      url: "https://fullstaxx.com",
    },
    url: `https://fullstaxx.com/articles/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>›</span>
          <Link
            href={`/category/${frontmatter.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-accent"
          >
            {frontmatter.category}
          </Link>
          <span>›</span>
          <span className="text-neutral-600 line-clamp-1">{frontmatter.title}</span>
        </nav>

        <div className="flex gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-6">
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${getCategoryColor(frontmatter.category)}`}
              >
                {frontmatter.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight mb-4">
                {frontmatter.title}
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed mb-5">
                {frontmatter.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-neutral-400 pb-5 border-b border-neutral-200">
                <span>By {frontmatter.author}</span>
                <span>·</span>
                <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
                {frontmatter.tags && (
                  <>
                    <span>·</span>
                    <div className="flex gap-2 flex-wrap">
                      {frontmatter.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* Affiliate disclaimer */}
            {frontmatter.affiliateLinks && frontmatter.affiliateLinks.length > 0 && (
              <div className="mb-6">
                <AffiliateDisclaimer />
              </div>
            )}

            {/* MDX content */}
            <div className="prose prose-neutral max-w-none">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            {/* Affiliate links */}
            {frontmatter.affiliateLinks && frontmatter.affiliateLinks.length > 0 && (
              <div className="mt-10 p-6 bg-accent-light border border-orange-200 rounded-xl">
                <h3 className="text-base font-semibold text-neutral-800 mb-4">
                  Recommended Tools
                </h3>
                <div className="flex flex-wrap gap-3">
                  {frontmatter.affiliateLinks.map((link) => (
                    <AffiliateButton key={link.name} href={link.url}>
                      Try {link.name}
                    </AffiliateButton>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* TOC Sidebar */}
          <div className="w-64 flex-shrink-0">
            <TableOfContents content={content} />
          </div>
        </div>
      </div>
    </>
  );
}
