import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">F</span>
              </div>
              <span className="font-bold text-neutral-900">Fullstaxx</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Independent tool reviews and comparisons for modern businesses.
              No fluff, just honest analysis.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-800 mb-3">Categories</h4>
            <ul className="space-y-2">
              {["CRM", "Email Marketing", "Project Management", "Scheduling", "AI Tools"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-neutral-500 hover:text-accent transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-800 mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-neutral-500 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-neutral-500 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-sm text-neutral-500 hover:text-accent transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6 text-center">
          <p className="text-sm text-neutral-400">
            © 2026 Fullstaxx · Independent tool reviews and comparisons
          </p>
        </div>
      </div>
    </footer>
  );
}
