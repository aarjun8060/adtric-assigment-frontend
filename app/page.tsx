import { EventDiaryPage } from "@/components/site/public-pages";
import { listNewsEvents } from "@/lib/school-api";

export const revalidate = 30;

export default async function HomePage() {
  const result = await listNewsEvents({ page: 1, limit: 3 });
  return <EventDiaryPage items={result.success ? result.data : []} />;
}
