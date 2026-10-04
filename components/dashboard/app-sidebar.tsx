"use client";
import * as React from "react";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  // Search,
  Settings,
  MessageCircle,
  BarChart,
  Trash,
  Home,
  Newspaper,
  ClipboardList,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const data = {
  user: {
    name: "John Doe",
    phone: "+91 XXXXXXXXXX",
    avatar: "/logo.svg", // /logo.svg
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "New Chat ",
      url: "/dashboard/new",
      icon: MessageCircle,
    },
    {
      title: "General Overview",
      url: "/dashboard/overview",
      icon: BarChart,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Trash",
      url: "/dashboard/trash",
      icon: Trash,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const isSchoolAdmin = pathname.startsWith("/admin");
  const logoutSchoolAdmin = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a
                href={isSchoolAdmin ? "/admin/news-events" : "/dashboard"}
                className="flex items-center gap-2"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <MessageCircle className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="text-xl font-bold text-primary">
                    {isSchoolAdmin ? "Manthan Admin" : "ChatAstro"}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isSchoolAdmin ? (
          <SidebarGroup>
            <SidebarGroupLabel>School administration</SidebarGroupLabel>
            <SidebarMenu>
              {[
                {
                  title: "News & Events",
                  href: "/admin/news-events",
                  icon: Newspaper,
                },
                {
                  title: "Enquiries",
                  href: "/admin/enquiries",
                  icon: ClipboardList,
                },
              ].map(({ title, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(href)}
                    tooltip={title}
                  >
                    <a href={href}>
                      <Icon />
                      <span>{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <NavMain
            items={data.navMain}
            pathname={pathname}
            sidebarState="expanded"
            key="navMain"
          />
        )}
      </SidebarContent>
      <SidebarFooter>
        {isSchoolAdmin ? (
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => void logoutSchoolAdmin()}
          >
            <span className="material-symbols-outlined text-[18px]">
              logout
            </span>
            Sign out
          </Button>
        ) : (
          <NavUser user={data.user} key="navUser" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
