import { api } from "./Base";

interface DiaryEntryProps {
    diary_id: number;
    date: string;
    content: string;
    image_urls: string[];
  }
  
  // API 호출 결과를 DiaryEntryProps 배열로 반환하도록 명시
  export const diaryList = async ({ startId, endId }: { startId: string; endId: string }): Promise<DiaryEntryProps[]> => {
    try {
      const response = await api.get(`/common-service/diaries?start=${startId}&end=${endId}`);
      return response.data as DiaryEntryProps[];
    } catch (error) {
      console.error("API error: ", error);
      throw error;
    }
  };