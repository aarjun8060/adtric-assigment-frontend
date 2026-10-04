"use client";
import { RESPONSE_STATUS } from "@/constants";
import { baseQuery } from "@/lib/api";
import useChatSessionsStore from "@/store/chat-sessions";
import useLoadingStore from "@/store/loading";
import { useEffect, useCallback } from "react";

export function ChatSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSessions, setPaginator } = useChatSessionsStore();
  const {
    setLoading,
    // loading,
  } = useLoadingStore();

  const handleFectchChatSessions = useCallback(async () => {
    try {
      setLoading();
      const data = await baseQuery({
        url: "/chat/session/list",
        method: "POST",
        data: {
          query: {},
          options: {
            collation: "",
            sort: { name: 1 },
            populate: "",
            projection: "",
            lean: false,
            leanWithId: true,
            page: 1,
            limit: 9,
            pagination: true,
            useEstimatedCount: false,
            useCustomCountFn: false,
            forceCountFn: false,
            read: {},
            options: {},
          },
          isCountOnly: false,
        },
      });

      // Check if the response has an error property
      if (data && data.error) {
        console.error("Error fetching sessions:", data.error);
        return [];
      }

      if (data && data.status === RESPONSE_STATUS.success) {
        setSessions(data.data.data);
        setPaginator(data.data.paginator);
      } else if (data && data.status === RESPONSE_STATUS.recordNotFound) {
        return [];
      } else {
        console.error("Error fetching sessions:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [];
    } finally {
      setLoading();
    }
  }, [setSessions, setPaginator, setLoading]);

  useEffect(() => {
    handleFectchChatSessions();
  }, [handleFectchChatSessions]);

  return <>{children}</>;
}
