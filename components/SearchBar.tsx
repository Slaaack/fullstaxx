"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Article } from "@/lib/articles";

interface SearchBarProps {
  articles: Article[];
}

export default function SearchBar({ articles }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = articles.filter(
      (a) =>
        a.frontmatter.title.toLowerCase().includes(q) ||
        a.frontmatter.description.toLowerCase().includes(q) ||
        a.frontmatter.category.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query, articles]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search tools, reviews..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-9 pr-4 py-2 bg-neutral-100 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:bg-white transition-all"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl border border-neutral-200 shadow-lg z-50 overflow-hidden">
          {results.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900 line-clamp-1">
                  {a.frontmatter.title}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {a.frontmatter.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
