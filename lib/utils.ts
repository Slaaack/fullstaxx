export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    CRM: "bg-blue-100 text-blue-700",
    "Email Marketing": "bg-purple-100 text-purple-700",
    "Project Management": "bg-green-100 text-green-700",
    Scheduling: "bg-yellow-100 text-yellow-700",
    "AI Tools": "bg-pink-100 text-pink-700",
  };
  return colors[category] ?? "bg-orange-100 text-orange-700";
}

export function getSnapOGUrl(title: string, description?: string): string {
  const params = new URLSearchParams({ title });
  if (description) params.set("subtitle", description);
  return `https://snapog.vercel.app/api/og?${params.toString()}`;
}
