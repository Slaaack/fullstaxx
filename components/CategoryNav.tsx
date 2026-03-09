"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = [
  "All",
  "CRM",
  "Email Marketing",
  "Project Management",
  "Scheduling",
  "AI Tools",
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Category navigation">
      {CATEGORIES.map((cat) => {
        const href =
          cat === "All" ? "/" : `/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, "-"))}`;
        const isActive =
          cat === "All"
            ? pathname === "/"
            : pathname.includes(cat.toLowerCase().replace(/\s+/g, "-"));

        return (
          <Link
            key={cat}
            href={href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-accent text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </nav>
  );
}
