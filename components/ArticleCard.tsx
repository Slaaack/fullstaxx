"use client";

import Link from "next/link";
import { useState } from "react";
import { Article } from "@/lib/articles";
import { formatDate, getCategoryColor, getSnapOGUrl } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { slug, frontmatter } = article;
  const ogImage = getSnapOGUrl(frontmatter.title, frontmatter.description);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-200">
        {/* Thumbnail */}
        <div className="aspect-[16/9] bg-neutral-100 overflow-hidden relative">
          {imgFailed ? (
            /* Gradient fallback */
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 p-5">
              <span className="text-white font-semibold text-center text-sm leading-snug line-clamp-3 drop-shadow">
                {frontmatter.title}
              </span>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={ogImage}
              alt={frontmatter.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category badge */}
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${getCategoryColor(frontmatter.category)}`}
          >
            {frontmatter.category}
          </span>

          {/* Title */}
          <h3 className="font-semibold text-neutral-900 text-base leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {frontmatter.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{frontmatter.author}</span>
            <span>{formatDate(frontmatter.date)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
