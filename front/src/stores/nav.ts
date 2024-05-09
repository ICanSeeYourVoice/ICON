import { create } from "zustand";

interface NavState {
  selected: number;
  setSelected: (index: number) => void;
}

export const useNavStore = create<NavState>((set) => ({
  selected: 2,
  setSelected: (index) => set({ selected: index }),
}));
