import { API_BASE_URL } from "@/config";

export type NewsCategory = "News" | "Event" | "Achievement";
export type EnquiryClass =
  | "Toddlers"
  | "Pre-Nursery"
  | "Nursery"
  | "Kindergarten"
  | "Grade 1"
  | "Grade 2";
export type EnquiryStatus = "New" | "Contacted" | "Closed";
export type CrmStatus = "Pending" | "Sent" | "Failed";

export const ENQUIRY_CLASS_OPTIONS: EnquiryClass[] = [
  "Toddlers",
  "Pre-Nursery",
  "Nursery",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
];

export interface NewsEvent {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  date: string;
  image?: string;
  shortDescription: string;
  content?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
  message?: string;
}

export interface SingleResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface EnquiryPayload {
  parentName: string;
  studentName: string;
  classApplying: EnquiryClass | string;
  mobile: string;
  email?: string;
  message?: string;
}

export interface Enquiry {
  id: string;
  parentName: string;
  studentName: string;
  classApplying: string;
  mobile: string;
  email?: string;
  message?: string;
  status: EnquiryStatus;
  crmStatus: CrmStatus;
  crmResponse?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

const API_V1 = `${API_BASE_URL}/api/v1`;

export function resolveMediaUrl(path?: string | null): string {
  if (!path) return "/placeholder-news.svg";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
}

export function formatNewsDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function estimateReadMinutes(content?: string): number {
  if (!content) return 3;
  const words = content
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function parseJson<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

function redirectExpiredAdminSession(res: Response) {
  if (res.status === 401 && typeof window !== "undefined") {
    window.location.assign("/admin/login");
  }
}

export async function listNewsEvents(params?: {
  page?: number;
  limit?: number;
  category?: NewsCategory;
}): Promise<PaginatedResponse<NewsEvent>> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.category) search.set("category", params.category);

  const qs = search.toString();
  try {
    const res = await fetch(`${API_V1}/news-events${qs ? `?${qs}` : ""}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("Failed to load news");
    return await parseJson<PaginatedResponse<NewsEvent>>(res);
  } catch {
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: params?.limit ?? 10,
        total: 0,
        totalPages: 0,
      },
      message: "Failed to load news",
    };
  }
}

export async function getNewsEventBySlug(
  slug: string,
): Promise<SingleResponse<NewsEvent> | null> {
  try {
    const res = await fetch(
      `${API_V1}/news-events/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 30 },
      },
    );
    if (res.status === 404 || !res.ok) return null;
    return await parseJson<SingleResponse<NewsEvent>>(res);
  } catch {
    return null;
  }
}

export async function createEnquiry(payload: EnquiryPayload): Promise<
  | { ok: true; message: string }
  | {
      ok: false;
      status: number;
      message: string;
      errors?: Record<string, string>;
    }
> {
  const res = await fetch(`${API_V1}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await parseJson<{
    success: boolean;
    message: string;
    errors?: Record<string, string>;
  }>(res);

  if (res.ok) {
    return { ok: true, message: body.message };
  }

  return {
    ok: false,
    status: res.status,
    message: body.message || "Something went wrong",
    errors: body.errors,
  };
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await parseJson<{
    success: boolean;
    message: string;
    data?: { admin: { id: string; email: string; name: string } };
    errors?: Record<string, string>;
  }>(res);
  return { status: res.status, ...body };
}

export async function adminListNewsEvents(params?: {
  page?: number;
  limit?: number;
  category?: NewsCategory;
  published?: boolean;
}) {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.category) search.set("category", params.category);
  if (typeof params?.published === "boolean")
    search.set("published", String(params.published));
  const qs = search.toString();
  const res = await fetch(`/api/admin/news-events${qs ? `?${qs}` : ""}`, {
    credentials: "same-origin",
    cache: "no-store",
  });
  redirectExpiredAdminSession(res);
  if (!res.ok) throw new Error("Failed to load admin news");
  return parseJson<PaginatedResponse<NewsEvent>>(res);
}

export async function adminGetNewsEvent(id: string) {
  const res = await fetch(`/api/admin/news-events/${id}`, {
    credentials: "same-origin",
    cache: "no-store",
  });
  redirectExpiredAdminSession(res);
  if (!res.ok) return null;
  return parseJson<SingleResponse<NewsEvent>>(res);
}

export async function adminCreateNewsEvent(formData: FormData) {
  const res = await fetch("/api/admin/news-events", {
    method: "POST",
    credentials: "same-origin",
    body: formData,
  });
  redirectExpiredAdminSession(res);
  const body = await parseJson<{
    success: boolean;
    message?: string;
    data?: NewsEvent;
    errors?: Record<string, string>;
  }>(res);
  return { status: res.status, ...body };
}

export async function adminUpdateNewsEvent(id: string, formData: FormData) {
  const res = await fetch(`/api/admin/news-events/${id}`, {
    method: "PUT",
    credentials: "same-origin",
    body: formData,
  });
  redirectExpiredAdminSession(res);
  const body = await parseJson<{
    success: boolean;
    message?: string;
    data?: NewsEvent;
    errors?: Record<string, string>;
  }>(res);
  return { status: res.status, ...body };
}

export async function adminDeleteNewsEvent(id: string) {
  const res = await fetch(`/api/admin/news-events/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  redirectExpiredAdminSession(res);
  return {
    status: res.status,
    ...(await parseJson<{ success: boolean; message?: string }>(res)),
  };
}

export async function adminListEnquiries(params?: {
  page?: number;
  limit?: number;
  status?: EnquiryStatus;
}) {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.status) search.set("status", params.status);
  const qs = search.toString();
  const res = await fetch(`/api/admin/enquiries${qs ? `?${qs}` : ""}`, {
    credentials: "same-origin",
    cache: "no-store",
  });
  redirectExpiredAdminSession(res);
  if (!res.ok) throw new Error("Failed to load enquiries");
  return parseJson<PaginatedResponse<Enquiry>>(res);
}

export async function adminUpdateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
) {
  const res = await fetch(`/api/admin/enquiries/${id}/status`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  redirectExpiredAdminSession(res);
  return {
    status: res.status,
    ...(await parseJson<{ success: boolean; data?: Enquiry; message?: string }>(
      res,
    )),
  };
}

export async function adminRetryEnquiryCrm(id: string) {
  const res = await fetch(`/api/admin/enquiries/${id}/retry-crm`, {
    method: "POST",
    credentials: "same-origin",
  });
  redirectExpiredAdminSession(res);
  return {
    status: res.status,
    ...(await parseJson<{ success: boolean; data?: Enquiry; message?: string }>(
      res,
    )),
  };
}
