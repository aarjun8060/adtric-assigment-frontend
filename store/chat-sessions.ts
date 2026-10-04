import { PaginationInfo } from "@/types";
import { ChatSession } from "@/types";
import { create } from "zustand";

interface ChatSessionsState {
  sessions: ChatSession[];
  session: ChatSession | null;
  paginator: PaginationInfo;
  isLoading: boolean;
  setPaginator: (paginator: PaginationInfo) => void;
  setSessions: (sessions: ChatSession[]) => void;
  setSingleSession: (session: ChatSession) => void;
  setLoading: (loading: boolean) => void;
  addSession: (session: ChatSession) => void;
  updateSession: (sessionId: string, updates: Partial<ChatSession>) => void;
  removeSession: (sessionId: string) => void;
}

const useChatSessionsStore = create<ChatSessionsState>()((set, _get) => ({
  sessions: [],
  session: null,
  paginator: {
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  }, // Initial paginator state
  isLoading: false, // Initial loading state
  setSessions: (sessions: ChatSession[]) => set({ sessions }),
  setPaginator: (paginator: PaginationInfo) => set({ paginator }),
  setSingleSession: (session: ChatSession) => set({ session }),
  setLoading: (loading: boolean) => set({ isLoading: loading }), // Implementation for setLoading
  addSession: (session: ChatSession) =>
    set((state) => ({ sessions: [...state.sessions, session] })), // Implementation for addSession
  updateSession: (sessionId: string, updates: Partial<ChatSession>) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, ...updates } : s,
      ),
    })), // Implementation for updateSession
  removeSession: (sessionId: string) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
    })), // Implementation for removeSession
}));

export default useChatSessionsStore;
