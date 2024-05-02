import { api } from "./Base";

interface sendChatProps {
  message: string;
}

export const ChatAll = async () => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    console.log("1");
    const response = await api.get("/chat-service/conversations", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log("2");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const SendChat = async (sendData: sendChatProps) => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    const response = await api.post(
      "/chat-service/conversationsexport",
      sendData,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const ClearChat = async () => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    const response = await api.delete("/chat-service/conversations", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};
