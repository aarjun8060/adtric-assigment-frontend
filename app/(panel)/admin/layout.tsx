import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "School Admin", template: "%s | School Admin" },
  description: "Manage school news, events and admission enquiries.",
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default async function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("school_admin_token")?.value;
  if (!token) redirect("/admin/login");

  let authenticated = false;
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/news-events?page=1&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
    authenticated = response.ok;
  } catch {
    authenticated = false;
  }
  if (!authenticated) redirect("/admin/login");

  return children;
}
