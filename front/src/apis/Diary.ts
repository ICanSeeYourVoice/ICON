import { api } from "./Base";

interface DiaryEntryProps {
    diary_id: number;
    date: string;
    content: string;
    image_urls: string[];
    emoji:string;
  }

  interface CreateDiaryProps {
    date: string;
    
  }
  
  export const diaryList = async ({ startId, endId }: { startId: string; endId: string }): Promise<DiaryEntryProps[]> => {
    try {
      const response = await api.get(`/common-service/diaries/calendar?start=${startId}&end=${endId}`);
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


  export const diaryDelete = async (diaryDay: string) => {
    try {
      const response = await api.delete(`/common-service/diaries?date=${diaryDay}`);
      return response.data
    } catch (error) {
      console.error("API error: ", error);
      throw error;
    }
  }


  export const diaryDetail = async (diaryDay: string): Promise<DiaryEntryProps> => {
    try {
        const response = await api.get(`/common-service/diaries?date=${diaryDay}`);
        return response.data as DiaryEntryProps;  
    } catch (error) {
        console.error("API error: ", error);
        throw error;
    }
}


export const diaryImage = async (image: { imageData: File }) => {
  try {
      const formData = new FormData();
      formData.append("image", image.imageData);

      const response = await api.post(`/common-service/images`, formData);
      return response.data 
  } catch (error) {
      console.error("API error: ", error);
      throw error;
  }
}