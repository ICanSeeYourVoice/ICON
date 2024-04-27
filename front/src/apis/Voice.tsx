import axios from "axios";

interface VoiceType {
  [key: string]: string | number;
  text: string;
  speaker: string;
  volume: number;
  speed: number;
  pitch: number;
  format: string;
}

export const clovaVoice = async (voiceData: VoiceType): Promise<Blob> => {
  const params = new URLSearchParams();
  Object.keys(voiceData).forEach((key) => {
    params.append(key, voiceData[key].toString());
  });

  const headers = {
    "X-NCP-APIGW-API-KEY-ID": import.meta.env.VITE_APP_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": import.meta.env.VITE_APP_CLIENT_SECRET,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await axios.post<Blob>(
    "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts",
    params,
    {
      headers,
      responseType: "blob",
    }
  );
  console.log("voice API 들어옴");
  return response.data;
};
