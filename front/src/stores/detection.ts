import { create } from "zustand";

export const useDetectionStore = create((set) => ({
  isBabyCry: false,
  cryingType: 0,
  setIsBabyCry: (isCrying: boolean) => set({ isBabyCry: isCrying }),
  setCryingType: (type: number) => set({ cryingType: type }),
}));

type LoadingState = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
