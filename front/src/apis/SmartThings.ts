import { api, baseApi } from "./Base";

interface TokenProps {
  token: string;
}

interface RegisterRoutineProps {
  scene_id: string;
  trigger: string;
}

// GET: 루틴 조회
export const CheckRoutine = async () => {
  try {
    const response = await baseApi.get("/common-service/smart-things/scenes");
    return response.data;
  } catch (error) {
    console.error("CheckRoutine 등록 루틴 조회 실패: ", error);
    throw error;
  }
};

// POST: 토큰 등록
export const RegisterToken = async (token: TokenProps) => {
  try {
    const response = await api.post(
      "/common-service/smart-things/token",
      token
    );
    return response.data;
  } catch (error) {
    console.error("RegisterToken 개인 토큰 등록 실패: ", error);
    throw error;
  }
};

// GET: 상태 루틴 조회
export const GetStatusRoutine = async () => {
  try {
    const response = await baseApi.get("/common-service/smart-things/routines");
    return response.data;
  } catch (error) {
    console.error("GetStatusRoutine 상태 등록 루틴 조회 실패: ", error);
    throw error;
  }
};

// POST: 상태 루틴 등록
export const RegisterRoutine = async (routine: RegisterRoutineProps) => {
  try {
    const response = await api.post(
      "/common-service/smart-things/routines",
      routine
    );
    return response.data;
  } catch (error) {
    console.error("RegisterRoutine 루틴 등록 실패: ", error);
    throw error;
  }
};
