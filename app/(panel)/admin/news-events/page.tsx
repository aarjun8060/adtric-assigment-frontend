"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  adminDeleteNewsEvent,
  adminListNewsEvents,
  formatNewsDate,
  NewsCategory,
  NewsEvent,
  Pagination,
  resolveMediaUrl,
} from "@/lib/school-api";
import { Button } from "@/components/ui/button";

const categories: Array<NewsCategory | "All"> = [
  "All",
  "News",
  "Event",
  "Achievement",
];

export default function AdminNewsEventsPage() {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<NewsCategory | "All">("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminListNewsEvents({
        page,
        limit: 10,
        ...(category !== "All" ? { category } : {}),
      });
      setItems(result.data);
      setPagination(result.pagination);
    } catch {
      setError("Could not load news and events. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, [page, category]);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(item: NewsEvent) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`))
      return;
    const result = await adminDeleteNewsEvent(item.id);
    if (result.success) await load();
    else setError(result.message || "Could not delete this item.");
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 py-3">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">School content</p>
          <h1 className="text-3xl font-bold">News &amp; Events</h1>
        </div>
        <Button asChild>
          <Link href="/admin/news-events/new">Add news or event</Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Filter by category">
        {categories.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={item === category ? "default" : "outline"}
            onClick={() => {
              setCategory(item);
              setPage(1);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No news or events found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveMediaUrl(item.image)}
                          alt=""
                          className="h-12 w-16 rounded-md object-cover"
                        />
                        <div className="min-w-0">
                          <p className="max-w-md truncate font-semibold">
                            {item.title}
                          </p>
                          <p className="max-w-md truncate text-xs text-muted-foreground">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{formatNewsDate(item.date)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {item.published ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/news-events/${item.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => void remove(item)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
          <span className="text-muted-foreground">
            {pagination.total} items · page {page} of{" "}
            {Math.max(1, pagination.totalPages)}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page <= 1 || loading}
              onClick={() => setPage((value) => value - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page >= pagination.totalPages || loading}
              onClick={() => setPage((value) => value + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
