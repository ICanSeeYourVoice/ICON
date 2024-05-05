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

export const deleteGuardian = async (id: number) => {
  try {
    await api.delete(`/common-service/members/guardian/${id}`);
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const getMemberInfo = async () => {
  try {
    const response = await api.get("/common-service/members");

    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const getGuardianList = async () => {
  try {
    const response = await api.get("/common-service/members/guardian");

    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};
