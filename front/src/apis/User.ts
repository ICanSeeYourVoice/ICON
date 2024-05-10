import { baseApi } from "./Base";

interface LoginProps {
  uid: string;
  pw: string;
  token: string;
  isApp: 0;
}

interface JoinProps {
  uid: string;
  pw: string;
  name: string;
}

export const userLogin = async (loginData: LoginProps) => {
  try {
    const response = await baseApi.post(
      "/common-service/auth/login",
      loginData
    );

    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const userJoin = async (joinData: JoinProps) => {
  try {
    const response = await baseApi.post("/common-service/members", joinData);

    return response.data;
  } catch (error) {
    console.error("회원가입 실패: ", error);
    throw error;
  }
};


