import { permanentRedirect } from "next/navigation";

export default async function LegacyNewsArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/news-events/${encodeURIComponent(slug)}`);
}
