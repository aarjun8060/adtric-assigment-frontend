import { User } from "@/types";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  userLogout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  userLogout: () => set({ user: null }),
}));

export default useUserStore;
