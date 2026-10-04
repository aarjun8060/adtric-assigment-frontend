"use client";
import {
  ChevronRight,
  type LucideIcon,
  Ellipsis,
  MessageCircle,
} from "lucide-react";
import { IconMoodPuzzled } from "@tabler/icons-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Suspense } from "react";
import Loader from "../loader";
import useChatSessionsStore from "@/store/chat-sessions";
import useLoadingStore from "@/store/loading";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import RenameChatSessionDialog from "../dialogs/rename-chat";
import { AlertDialogDeleteChatSession } from "../dialogs/delete-chat-session";
import { AlertDialogArchiveChatSession } from "../dialogs/archive-chat-session";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    key?: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  pathname: string;
  sidebarState: "expanded" | "collapsed";
}

function ChatSessionsList({ pathname }: { pathname: string }) {
  const { sessions } = useChatSessionsStore();
  const { loading } = useLoadingStore();
  if (loading) {
    return (
      <SidebarMenuItem>
        <Loader>Loading chat sessions...</Loader>
      </SidebarMenuItem>
    );
  }
  if (!sessions || !Array.isArray(sessions) || sessions.length === 0) {
    return (
      <SidebarMenuItem>
        <div className="flex items-center justify-center space-x-2 p-2">
          <IconMoodPuzzled className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            No chat sessions found!
          </span>
        </div>
      </SidebarMenuItem>
    );
  }

  return (
    <>
      {sessions &&
        Array.isArray(sessions) &&
        sessions.map((item, index: number) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              tooltip={item.title}
              className={cn(
                pathname === `/dashboard/chat/${item.id}` &&
                  "bg-sidebar-primary text-sidebar-primary-foreground",
                "justify-between items-center",
              )}
            >
              <Link
                href={`/dashboard/chat/${item.id}`}
                className={cn("flex items-center justify-center space-x-1")}
              >
                <MessageCircle className="size-4" />
                <span>{item.title}</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="size-4 opacity-0 transition-opacity group-hover/menu-item:opacity-100" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <RenameChatSessionDialog
                    key={item.id}
                    sessionId={item.id}
                    currentTitle={item.title}
                  />
                  <AlertDialogArchiveChatSession sessionId={item.id} />
                  <AlertDialogDeleteChatSession sessionId={item.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
    </>
  );
}

export function NavMain({ items, pathname, sidebarState }: NavMainProps) {
  return (
    <div>
      <SidebarGroup stateSidebar={false}>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Collapsible
                key={item.title}
                asChild={false}
                defaultOpen={item.isActive}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      pathname === item.url &&
                        "bg-sidebar-primary text-sidebar-primary-foreground",
                      "",
                    )}
                  >
                    <Link href={item.url} className={cn("flex items-center")}>
                      <Icon size={sidebarState !== "expanded" ? 180 : 24} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup stateSidebar={true} className="-mt-4 flex-1 flex flex-col">
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <ScrollArea className="h-[400px] min-h-full">
          <SidebarMenu>
            <Suspense fallback={<Loader>Loading chat sessions...</Loader>}>
              <ChatSessionsList pathname={pathname} />
            </Suspense>
          </SidebarMenu>
        </ScrollArea>
      </SidebarGroup>
    </div>
  );
}
