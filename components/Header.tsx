import Link from "next/link";
import SearchBar from "./SearchBar";
import { getAllArticles } from "@/lib/articles";

export default async function Header() {
  const articles = await getAllArticles();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-neutral-900 text-lg tracking-tight">
              Fullstaxx
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/category/crm" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              CRM
            </Link>
            <Link href="/category/ai-tools" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              AI Tools
            </Link>
            <Link href="/category/project-management" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Project Mgmt
            </Link>
            <Link href="/about" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              About
            </Link>
          </nav>

          {/* Search */}
          <div className="w-56 hidden sm:block">
            <SearchBar articles={articles} />
          </div>
        </div>
      </div>
    </header>
  );
}
