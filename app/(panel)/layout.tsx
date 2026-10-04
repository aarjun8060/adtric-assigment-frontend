import React from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PanelSessionProvider } from "@/components/admin/panel-session-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "ChatAstro Dashboard", template: "%s | ChatAstro" },
  description: "ChatAstro account dashboard",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <PanelSessionProvider>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </PanelSessionProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
