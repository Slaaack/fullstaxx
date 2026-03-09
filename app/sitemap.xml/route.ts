import { getAllArticles, getAllCategories } from "@/lib/articles";

const BASE_URL = "https://fullstaxx.com";

export function GET() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  const staticPages = [
    { url: `${BASE_URL}/`, priority: "1.0", changefreq: "daily" },
    { url: `${BASE_URL}/about`, priority: "0.5", changefreq: "monthly" },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

  const articlePages = articles.map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: a.frontmatter.date,
  }));

  type SitemapPage = {
    url: string;
    priority: string;
    changefreq: string;
    lastmod?: string;
  };

  const allPages: SitemapPage[] = [...staticPages, ...categoryPages, ...articlePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
