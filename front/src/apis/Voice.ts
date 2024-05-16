import { api, baseApi } from "./Base";

interface VoiceProps {
  text: string;
  speaker: string;
}

interface VoiceEntry {
  id: number;
  text: string;
}

export const clovaVoice = async (voiceData: VoiceProps): Promise<Blob> => {
  try {
    const response = await baseApi.post<Blob>(
      "/common-service/members/tts",
      voiceData,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};

export const AllVoice = async (): Promise<VoiceEntry[]> => {
  try {
    const response = await api.get<VoiceEntry[]>("/common-service/phrase");
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const DeleteVoice = async (phraseId: number) => {
  try {
    const url = `/common-service/phrase/${phraseId}`;
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("API 에러: ", error);
    throw error;
  }
};

export const CreateVoice = async (text: string) => {
  try {
    const response = await api.post("/common-service/phrase", { text });
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};
