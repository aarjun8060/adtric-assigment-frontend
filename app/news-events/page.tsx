import { NewsEventsPage } from "@/components/site/public-pages";
import {
  listNewsEvents,
  NewsCategory,
  NewsEvent,
  Pagination,
} from "@/lib/school-api";

export const revalidate = 30;
const categories: NewsCategory[] = ["Event", "News", "Achievement"];
const emptyPagination = (page: number): Pagination => ({
  page,
  limit: 9,
  total: 0,
  totalPages: 0,
});

export default async function NewsEventsRoute({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const parsedPage = Number.parseInt(params.page || "1", 10);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const category = categories.find((value) => value === params.category);
  let items: NewsEvent[] = [];
  let pagination = emptyPagination(page);
  const categoryCounts: Record<NewsCategory, number> = {
    Event: 0,
    News: 0,
    Achievement: 0,
  };

  try {
    const [result, ...counts] = await Promise.all([
      listNewsEvents({ page, limit: 9, ...(category ? { category } : {}) }),
      ...categories.map((value) =>
        listNewsEvents({ page: 1, limit: 1, category: value }),
      ),
    ]);
    if (result.success) {
      items = result.data;
      pagination = result.pagination;
    }
    counts.forEach((count, index) => {
      if (count.success)
        categoryCounts[categories[index]] = count.pagination.total;
    });
  } catch {
    // A failed API request leaves the page in its empty state; public data is never fabricated here.
  }

  return (
    <NewsEventsPage
      items={items}
      pagination={pagination}
      category={category}
      categoryCounts={categoryCounts}
    />
  );
}
