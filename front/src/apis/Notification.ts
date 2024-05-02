import { api } from "./Base";

export const cryAlarm = async () => {
  try {
    await api.post("/alarm-service/alarms/cry", null);
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};
