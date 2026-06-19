/* Small formatting helpers shared across pages. */

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/* Rough reading time estimate at 220 words per minute. */
export function readingTime(body: string | undefined, override?: number): number {
  if (override) return override;
  const words = (body ?? "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
