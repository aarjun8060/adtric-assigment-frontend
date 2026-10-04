import { NewsEventForm } from "@/components/admin/news-event-form";

export default async function EditNewsEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NewsEventForm itemId={id} />;
}
