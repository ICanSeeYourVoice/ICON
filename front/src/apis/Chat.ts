import { api } from "./Base";
interface sendChatProps {
  message: string;
}

export const ChatAll = async () => {
  try {
    const response = await api.get("/chat-service/conversations");
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const SendChat = async (sendData: sendChatProps) => {
  try {
    const response = await api.post("/chat-service/conversations", sendData);
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const ClearChat = async () => {
  try {
    const response = await api.delete("/chat-service/conversations");
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};
