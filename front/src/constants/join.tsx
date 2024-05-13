export const NAME_INFO = "이름은 1~5자 이내로 한글로 입력해주세요.";

export const ID_INFO = "아이디는 5~12자 이내로 입력해주세요.";

export const PASS_INFO =
  "비밀번호는 특수문자, 영문, 숫자를 포함한\n5~12자 이내로 입력해주세요.";

export const REPASS_INFO = "비밀번호를 다시 확인해주세요.";

export const PASS_REG = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{5,12}$/;
export const NAME_REG = /^[ㄱ-힣]{1,5}$/;
