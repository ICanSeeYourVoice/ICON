import { baseApi } from "./Base";
interface sendChatProps {
  message: string;
}

export const ChatAll = async () => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    const response = await baseApi.get("/chat-service/conversations", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const SendChat = async (sendData: sendChatProps) => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    const response = await baseApi.post(
      "/chat-service/conversations",
      sendData,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const ClearChat = async () => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    const response = await baseApi.delete("/chat-service/conversations", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};