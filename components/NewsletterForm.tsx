"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-2">
        <div className="inline-flex items-center gap-2 text-green-700 font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          You&apos;re in! We&apos;ll send you our best finds.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-accent text-white font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors whitespace-nowrap"
      >
        Get free updates
      </button>
    </form>
  );
}
