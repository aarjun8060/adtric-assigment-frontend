import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicArticlePage } from "@/components/site/public-pages";
import { getNewsEventBySlug, listNewsEvents, resolveMediaUrl } from "@/lib/school-api";

export const revalidate = 30;

async function loadArticle(slug: string) {
  try {
    return (await getNewsEventBySlug(slug))?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) return { title: "Story not found" };
  return {
    title: article.title,
    description: article.shortDescription,
    openGraph: { title: article.title, description: article.shortDescription, images: article.image ? [resolveMediaUrl(article.image)] : undefined },
  };
}

export default async function NewsArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) notFound();

  const updates = await listNewsEvents({ page: 1, limit: 4 });
  const latest = updates.success ? updates.data.filter((item) => item.slug !== slug).slice(0, 3) : [];
  return <PublicArticlePage article={article} latest={latest} />;
}
