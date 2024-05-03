import { api } from "./Base";

export const cryAlarm = async () => {
  try {
    await api.post("/alarm-service/alarms/cry", null);
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const analyzeAlarm = async (recordData: { data: File }) => {
  try {
    const formData = new FormData();

    formData.append("babyCryingAudio", recordData.data);

    const response = await api.post(
      "/analyze-service/analyze/predict",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};
