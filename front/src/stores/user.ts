import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userState {
  access_token: string;
  setToken: (access_token: string) => void;
}

const useUserStore = create(
  persist<userState>(
    (set) => ({
      access_token: "",
      setToken: (access_token) => set({ access_token }),
    }),
    { name: "useUserStore" }
  )
);

export default useUserStore;
