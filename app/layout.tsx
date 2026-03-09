import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fullstaxx.com"),
  title: {
    default: "Fullstaxx — Find the best tools for your business",
    template: "%s | Fullstaxx",
  },
  description:
    "Independent SaaS tool reviews, comparisons, and recommendations. Find the best CRM, email marketing, project management, and AI tools for your business.",
  keywords: ["SaaS reviews", "software comparison", "CRM", "business tools", "AI tools"],
  openGraph: {
    type: "website",
    siteName: "Fullstaxx",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@fullstaxx",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3690416421391040"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-background text-neutral-900 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
