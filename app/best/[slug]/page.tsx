import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import AffiliateButton from "@/components/AffiliateButton";
import ComparisonTable from "@/components/ComparisonTable";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCategoryColor } from "@/lib/utils";

export async function generateStaticParams() {
  // "Best X for Y" pages map to article slugs containing "-for-"
  const slugs = getAllArticleSlugs().filter((s) => s.includes("-for-"));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    alternates: { canonical: `https://fullstaxx.com/best/${params.slug}` },
  };
}

const mdxComponents = { ComparisonTable, AffiliateButton };

export default function BestPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
        🏆 Best Picks
      </div>

      <span
        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ml-2 mb-5 ${getCategoryColor(frontmatter.category)}`}
      >
        {frontmatter.category}
      </span>

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
          <h3 className="text-base font-semibold text-neutral-800 mb-4">Top Picks</h3>
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
