"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/use-auth";
import { NotificationPopover } from "@/components/dashboard/notification-popover";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  return pathname.startsWith("/admin") ? (
    <SchoolAdminHeader />
  ) : (
    <ChatAstroHeader />
  );
}

function SchoolAdminHeader() {
  const router = useRouter();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 w-full justify-center">
      <div className="flex justify-between items-center gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-lg font-semibold">
            School <span className="text-primary">Administration</span>
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.replace("/admin/login");
            router.refresh();
          }}
        >
          <LogOut /> Logout
        </Button>
      </div>
    </header>
  );
}

function ChatAstroHeader() {
  const { user, handleLogout } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 w-full justify-center">
      <div className="flex justify-between items-center gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-lg font-semibold">
            Hello{" "}
            <span className="text-primary">{user?.name || "John Doe"}</span>
          </h1>
        </div>
        <div className="flex items-center">
          {user && user.id && <NotificationPopover />}
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => await handleLogout()}
          >
            <LogOut /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
