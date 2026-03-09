import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import AffiliateButton from "@/components/AffiliateButton";
import ComparisonTable from "@/components/ComparisonTable";
import { MDXRemote } from "next-mdx-remote/rsc";

// Comparison pages re-use article slugs that start with the compare pattern
// e.g. /compare/hubspot-vs-monday-com maps to an article slug
function parseSlug(slug: string): { toolA: string; toolB: string } {
  const parts = slug.split("-vs-");
  return {
    toolA: parts[0]?.replace(/-/g, " "),
    toolB: parts[1]?.replace(/-/g, " ") ?? "",
  };
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs().filter((s) => s.includes("-vs-"));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (article) {
    return {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      alternates: { canonical: `https://fullstaxx.com/compare/${params.slug}` },
    };
  }
  const { toolA, toolB } = parseSlug(params.slug);
  return {
    title: `${toolA} vs ${toolB}: Detailed Comparison`,
    description: `Side-by-side comparison of ${toolA} and ${toolB}. Features, pricing, and verdict.`,
  };
}

const mdxComponents = { ComparisonTable, AffiliateButton };

export default function ComparePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
        Head-to-Head Comparison
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight mb-4">
        {frontmatter.title}
      </h1>
      <p className="text-lg text-neutral-500 mb-8">{frontmatter.description}</p>

      {frontmatter.affiliateLinks && frontmatter.affiliateLinks.length > 0 && (
        <div className="mb-6">
          <AffiliateDisclaimer />
        </div>
      )}

      <div className="prose prose-neutral max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {frontmatter.affiliateLinks && frontmatter.affiliateLinks.length > 0 && (
        <div className="mt-10 p-6 bg-accent-light border border-orange-200 rounded-xl">
          <h3 className="text-base font-semibold text-neutral-800 mb-4">Try Them Yourself</h3>
          <div className="flex flex-wrap gap-3">
            {frontmatter.affiliateLinks.map((link) => (
              <AffiliateButton key={link.name} href={link.url}>
                Try {link.name}
              </AffiliateButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
