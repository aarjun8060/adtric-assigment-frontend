"use client";

import { usePathname } from "next/navigation";
import { ChatSessionProvider } from "@/provider/chat-session";

export function PanelSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return pathname.startsWith("/admin") ? (
    children
  ) : (
    <ChatSessionProvider>{children}</ChatSessionProvider>
  );
}
