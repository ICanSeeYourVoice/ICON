import { api } from "./Base";

interface LoginType {
  uid: string;
  pw: string;
}

interface JoinType {
  uid: string;
  pw: string;
  name: string;
}

export const userLogin = async (loginData: LoginType) => {
  try {
    const response = await api.post("/common-service/auth/login", loginData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API에러: ", error);
    throw error;
  }
};

export const userJoin = async (joinData: JoinType) => {
  try {
    const response = await api.post("/common-service/members", joinData);
    console.log("API 들어옴");

    return response.data;
  } catch (error) {
    console.error("회원가입 실패: ", error);
    throw error;
  }
};
