import { baseApi } from "./Base";

interface VoiceProps {
  text: string;
  speaker : string;
}

export const clovaVoice = async (voiceData: VoiceProps): Promise<Blob> => {
  const access_token = sessionStorage.getItem("access_token");

  const headers = {
    "Authorization" : `Bearer ${access_token}`,
  };
try {
    const response = await baseApi.post<Blob>(
      "/common-service/members/tts",
      voiceData,
      { headers, responseType: 'blob' } 
    );
    return response.data;
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};