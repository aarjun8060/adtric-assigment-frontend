"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  adminCreateNewsEvent,
  adminGetNewsEvent,
  adminUpdateNewsEvent,
  NewsCategory,
  resolveMediaUrl,
} from "@/lib/school-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categoryOptions: NewsCategory[] = ["News", "Event", "Achievement"];
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 2 * 1024 * 1024;

export function NewsEventForm({ itemId }: { itemId?: string }) {
  const router = useRouter();
  const editing = Boolean(itemId);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<NewsCategory>("News");
  const [date, setDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (!itemId) return;
    adminGetNewsEvent(itemId)
      .then((response) => {
        if (!response?.data) {
          setError("This news or event could not be found.");
          setLoading(false);
          return;
        }
        const item = response.data;
        setTitle(item.title);
        setCategory(item.category);
        setDate(item.date.slice(0, 10));
        setShortDescription(item.shortDescription);
        setContent(item.content || "");
        setPublished(Boolean(item.published));
        setCurrentImage(item.image || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load this news or event.");
        setLoading(false);
      });
  }, [itemId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const imageInput = form.elements.namedItem("image") as HTMLInputElement;
    const image = imageInput.files?.[0];
    if (!editing && !image) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (image && !allowedTypes.includes(image.type)) {
      setError("Image must be a JPG, PNG, or WebP file.");
      return;
    }
    if (image && image.size > maxImageSize) {
      setError("Image must not exceed 2 MB.");
      return;
    }

    const body = new FormData();
    body.set("title", title);
    body.set("category", category);
    body.set("date", date);
    body.set("shortDescription", shortDescription);
    body.set("content", content);
    body.set("published", String(published));
    if (image) body.set("image", image);

    setSaving(true);
    try {
      const result = editing
        ? await adminUpdateNewsEvent(itemId!, body)
        : await adminCreateNewsEvent(body);
      if (!result.success) {
        setError(
          result.errors
            ? Object.values(result.errors).join(" · ")
            : result.message || "Could not save this item.",
        );
        return;
      }
      router.push("/admin/news-events");
      router.refresh();
    } catch {
      setError("Could not connect to the admin service. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <p className="py-10 text-sm text-muted-foreground">Loading item…</p>;

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 py-3">
      <div>
        <p className="text-sm text-muted-foreground">News &amp; Events</p>
        <h1 className="text-3xl font-bold">
          {editing ? "Edit item" : "Add item"}
        </h1>
      </div>
      <form
        className="space-y-5 rounded-xl border bg-white p-5 shadow-sm md:p-7"
        onSubmit={submit}
      >
        <label className="block space-y-2 text-sm font-medium">
          Title
          <Input
            required
            minLength={2}
            maxLength={200}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block space-y-2 text-sm font-medium">
            Category
            <select
              className="h-10 w-full rounded-md border bg-white px-3 text-sm"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as NewsCategory)
              }
            >
              {categoryOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-2 text-sm font-medium">
            Date
            <Input
              required
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>
        <label className="block space-y-2 text-sm font-medium">
          Image{" "}
          {editing && (
            <span className="font-normal text-muted-foreground">
              (optional; keep current image if unchanged)
            </span>
          )}
          <Input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required={!editing}
          />
        </label>
        {currentImage && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <img
              src={resolveMediaUrl(currentImage)}
              alt="Current item"
              className="h-16 w-24 rounded-md object-cover"
            />
            Current image
          </div>
        )}
        <label className="block space-y-2 text-sm font-medium">
          Short description
          <textarea
            required
            maxLength={500}
            rows={3}
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Content
          <textarea
            required
            maxLength={50000}
            rows={10}
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <label className="flex items-center gap-3 rounded-lg border px-3 py-3 text-sm font-medium">
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
            className="size-4 accent-primary"
          />
          Published
        </label>
        {error && (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/news-events")}
          >
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {editing ? "Save changes" : "Create item"}
          </Button>
        </div>
      </form>
    </section>
  );
}
