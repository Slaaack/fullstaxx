import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content/articles");

export interface AffiliateLink {
  name: string;
  url: string;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  affiliateLinks?: AffiliateLink[];
  featured?: boolean;
  image?: string;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.frontmatter.date).getTime() -
        new Date(a!.frontmatter.date).getTime()
    ) as Article[];
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.featured);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (a) =>
      a.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const articles = getAllArticles();
  const cats = Array.from(
    new Set(articles.map((a) => a.frontmatter.category))
  );
  return cats.sort();
}
