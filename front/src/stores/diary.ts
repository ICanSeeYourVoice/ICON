import { create } from 'zustand';

interface DateState {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

interface ImageUploadState {
    previewUrls: string[];
    addImage: (url: string) => void;
    removeImage: (index: number) => void;
    clearImages: () => void;  
  }

interface EmojiState {
  selectedEmojiId: string | null;
  setSelectedEmojiId: (id: string | null) => void;
}


export const useDateStore = create<DateState>((set) => ({
  selectedDate: new Date(),  
  setSelectedDate: (date) => set({ selectedDate: date })
}));


  export const useImageStore = create<ImageUploadState>((set) => ({
    previewUrls: [],
    addImage: (url) => set((state) => ({
      previewUrls: [...state.previewUrls, url].slice(0, 6)
    })),
    removeImage: (index) => set((state) => ({
      previewUrls: state.previewUrls.filter((_, i) => i !== index)
    })),
    clearImages: () => set(() => ({ 
      imageFiles: [],
      previewUrls: []
    }))
  }));




 
  export const useEmojiStore = create<EmojiState>((set) => ({
    selectedEmojiId: null,
    setSelectedEmojiId: (id) => set({ selectedEmojiId: id }),
  }));
  
