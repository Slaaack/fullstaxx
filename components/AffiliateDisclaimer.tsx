export default function AffiliateDisclaimer() {
  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
      <svg
        className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
          clipRule="evenodd"
        />
      </svg>
      <p>
        <strong>Affiliate disclosure:</strong> This page contains affiliate
        links. If you purchase through these links, we may earn a commission at
        no extra cost to you. Our editorial opinions are independent.
      </p>
    </div>
  );
}
