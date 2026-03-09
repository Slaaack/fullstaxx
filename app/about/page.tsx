import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Fullstaxx",
  description:
    "Fullstaxx publishes independent, in-depth reviews and comparisons of business software. No sponsored content, just honest analysis.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-2xl font-bold text-neutral-900">Fullstaxx</span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          About Us
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          We help businesses find the right software — without the marketing fluff.
        </p>
      </div>

      <div className="prose prose-neutral max-w-none">
        <h2>Our mission</h2>
        <p>
          Every year, businesses waste millions of dollars on software that doesn&apos;t fit their needs.
          Sales teams demo the wrong CRM. Marketing teams pick email tools that don&apos;t scale.
          Founders sign annual contracts for tools they stop using after month two.
        </p>
        <p>
          Fullstaxx was built to fix that. We review and compare SaaS tools with the depth and
          honesty of someone who actually uses them — not press releases and vendor promises.
        </p>

        <h2>How we work</h2>
        <p>
          Our editorial team signs up for real trials, tests real workflows, and talks to
          real users before we publish anything. When we recommend a tool, it&apos;s because
          we&apos;d stake our own reputation on it.
        </p>
        <p>
          Some of our links are affiliate links. We earn a small commission when you buy through
          them — at no extra cost to you. This is how we keep the lights on. Our reviews are
          never influenced by affiliate relationships: we recommend what we believe is genuinely best.
        </p>

        <h2>Categories we cover</h2>
        <ul>
          {["CRM", "Email Marketing", "Project Management", "Scheduling", "AI Tools"].map((cat) => (
            <li key={cat}>
              <Link href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`} className="text-accent hover:underline">
                {cat}
              </Link>
            </li>
          ))}
        </ul>

        <h2>Contact</h2>
        <p>
          Have a tool you&apos;d like us to review? Found an error in one of our articles?
          Reach us at{" "}
          <a href="mailto:hello@fullstaxx.com" className="text-accent hover:underline">
            hello@fullstaxx.com
          </a>.
        </p>
      </div>
    </div>
  );
}
