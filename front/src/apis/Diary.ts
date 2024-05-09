import { api } from "./Base";

interface DiaryEntryProps {
    diary_id: number;
    date: string;
    content: string;
    image_urls: string[];
  }

  interface CreateDiaryProps {
    content : string;
    date: string;
    image_urls : string[];
    
  }
  
  export const diaryList = async ({ startId, endId }: { startId: string; endId: string }): Promise<DiaryEntryProps[]> => {
    try {
      const response = await api.get(`/common-service/diaries?start=${startId}&end=${endId}`);
      return response.data as DiaryEntryProps[];
    } catch (error) {
      console.error("API error: ", error);
      throw error;
    }
  };



  export const diaryRegister = async (diaryCreateData: CreateDiaryProps) => {
    try {
      const response = await api.post("/common-service/diaries", diaryCreateData);
      return response.data
    } catch (error) {
      console.error("API error: ", error);
      throw error;
    }
  }



  export const diaryDelete = async (diaryId: number) => {
    try {
      const response = await api.delete(`/common-service/diaries/${diaryId}`);
      return response.data
    } catch (error) {
      console.error("API error: ", error);
      throw error;
    }
  }
