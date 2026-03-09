interface AffiliateButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function AffiliateButton({
  href,
  children,
  variant = "primary",
  className = "",
}: AffiliateButtonProps) {
  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md",
    secondary:
      "bg-neutral-900 text-white hover:bg-neutral-700 shadow-sm hover:shadow-md",
    outline:
      "border-2 border-accent text-accent hover:bg-accent hover:text-white",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 ${variants[variant]} ${className}`}
    >
      {children}
      <svg
        className="w-3.5 h-3.5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    </a>
  );
}
