import { create } from 'zustand';

interface DateState {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

interface ImageUploadState {
    imageFiles: File[];
    previewUrls: string[];
    addImages: (newFiles: File[]) => void;
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
    imageFiles: [],
    previewUrls: [],
    addImages: (newFiles) => set((state) => {
      const totalFiles = state.imageFiles.concat(newFiles).slice(0, 6);
      const fileURLs = totalFiles.map(file => URL.createObjectURL(file));
      return { imageFiles: totalFiles, previewUrls: fileURLs };
    }),
    removeImage: (index) => set((state) => {
      const newFiles = state.imageFiles.filter((_, i) => i !== index);
      const newURLs = state.previewUrls.filter((_, i) => i !== index);
      return { imageFiles: newFiles, previewUrls: newURLs };
    }),
    clearImages: () => set(() => ({ 
      imageFiles: [],
      previewUrls: []
    }))
  }));


 
  export const useEmojiStore = create<EmojiState>((set) => ({
    selectedEmojiId: null,
    setSelectedEmojiId: (id) => set({ selectedEmojiId: id }),
  }));
  
