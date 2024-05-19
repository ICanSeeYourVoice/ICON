import { baseApi } from "./Base";
interface sendChatProps {
  message: string;
}

export const ChatAll = async () => {
  try {
    const response = await baseApi.get("/chat-service/conversations");
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const SendChat = async (sendData: sendChatProps) => {
  try {
    const response = await baseApi.post(
      "/chat-service/conversations",
      sendData
    );
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const ClearChat = async () => {
  try {
    const response = await baseApi.delete("/chat-service/conversations");
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};
