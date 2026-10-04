"use client";

import { useCallback, useEffect, useState } from "react";
import {
  adminListEnquiries,
  adminRetryEnquiryCrm,
  adminUpdateEnquiryStatus,
  Enquiry,
  EnquiryStatus,
  formatNewsDate,
  Pagination,
} from "@/lib/school-api";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

const statusOptions: Array<EnquiryStatus | "All"> = [
  "All",
  "New",
  "Contacted",
  "Closed",
];

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<EnquiryStatus | "All">("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [retryingId, setRetryingId] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminListEnquiries({
        page,
        limit: 10,
        ...(status !== "All" ? { status } : {}),
      });
      setItems(result.data);
      setPagination(result.pagination);
    } catch {
      setError("Could not load enquiries. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeStatus(item: Enquiry, nextStatus: EnquiryStatus) {
    setUpdatingId(item.id);
    setError("");
    try {
      const result = await adminUpdateEnquiryStatus(item.id, nextStatus);
      if (!result.success) {
        setError(result.message || "Could not update enquiry status.");
        return;
      }
      await load();
    } catch {
      setError("Could not connect to the admin service. Please try again.");
    } finally {
      setUpdatingId("");
    }
  }

  async function retryCrm(item: Enquiry) {
    setRetryingId(item.id);
    setError("");
    try {
      const result = await adminRetryEnquiryCrm(item.id);
      if (!result.success) {
        setError(result.message || "Could not retry CRM delivery.");
        return;
      }
      await load();
    } catch {
      setError("Could not connect to the admin service. Please try again.");
    } finally {
      setRetryingId("");
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 py-3">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Admissions CRM</p>
          <h1 className="text-3xl font-bold">Enquiries</h1>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          Status
          <select
            className="h-10 rounded-md border bg-white px-3"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as EnquiryStatus | "All");
              setPage(1);
            }}
          >
            <option value="All">All statuses</option>
            {statusOptions
              .filter((value): value is EnquiryStatus => value !== "All")
              .map((value) => (
                <option key={value}>{value}</option>
              ))}
          </select>
        </label>
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
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Parent / Student</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Enquiry</th>
                <th className="px-4 py-3">CRM result</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4">
                      {formatNewsDate(item.createdAt)}
                      <div className="mt-1 text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold">{item.parentName}</p>
                      <p className="text-muted-foreground">
                        {item.studentName}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <a
                        className="text-primary hover:underline"
                        href={`tel:${item.mobile}`}
                      >
                        {item.mobile}
                      </a>
                      {item.email && (
                        <p className="mt-1">
                          <a
                            className="text-primary hover:underline"
                            href={`mailto:${item.email}`}
                          >
                            {item.email}
                          </a>
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4">{item.classApplying}</td>
                    <td className="max-w-xs whitespace-normal px-4 py-4">
                      {item.message || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="max-w-xs whitespace-normal px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.crmStatus === "Sent" ? "bg-emerald-50 text-emerald-700" : item.crmStatus === "Failed" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        {item.crmStatus}
                      </span>
                      {item.crmResponse && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {item.crmResponse}
                        </p>
                      )}
                      {item.crmStatus === "Failed" && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="mt-2 h-8 gap-1 px-2 text-xs"
                          disabled={retryingId === item.id}
                          onClick={() => void retryCrm(item)}
                        >
                          <RotateCw size={13} />
                          {retryingId === item.id ? "Retrying…" : "Retry CRM"}
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        aria-label={`Status for ${item.parentName}`}
                        disabled={updatingId === item.id}
                        className="h-9 rounded-md border bg-white px-2"
                        value={item.status}
                        onChange={(event) =>
                          void changeStatus(
                            item,
                            event.target.value as EnquiryStatus,
                          )
                        }
                      >
                        {statusOptions
                          .filter(
                            (value): value is EnquiryStatus => value !== "All",
                          )
                          .map((value) => (
                            <option key={value}>{value}</option>
                          ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
          <span className="text-muted-foreground">
            {pagination.total} enquiries · page {page} of{" "}
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
