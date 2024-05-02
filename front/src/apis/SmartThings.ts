import { api } from "./Base";

interface TokenProps {
  smartthingsToken: string;
}

export const CheckRoutine = async () => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    const response = await api.get("/common-service/smart-things/scenes", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error("등록 루틴 조회 실패: ", error);
    throw error;
  }
};

export const RegisterToken = async (smartthingsToken: TokenProps) => {
  const access_token = sessionStorage.getItem("access_token");
  try {
    const response = await api.post(
      "/common-service/smart-things/token",
      smartthingsToken,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("개인 토큰 등록 실패: ", error);
    throw error;
  }
};
