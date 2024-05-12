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

type ModelState = {
  yamnetModel: any;
  setModel: (yamnetModel: any) => void;
};

export const useYamnetStore = create<ModelState>((set) => ({
  yamnetModel: null,
  setModel: (yamnetModel) => set({ yamnetModel }),
}));

interface ToggleState {
  isCryDetect: boolean;
  isFaceDetect: boolean;
  setIsCryDetect: (isCryDetect: boolean) => void;
  setIsFaceDetect: (isFaceDetect: boolean) => void;
}

export const useToggle = create<ToggleState>((set) => ({
  isCryDetect: true,
  isFaceDetect: false,
  setIsCryDetect: (isCryDetect) => set({ isCryDetect }),
  setIsFaceDetect: (isFaceDetect) => set({ isFaceDetect }),
}));
