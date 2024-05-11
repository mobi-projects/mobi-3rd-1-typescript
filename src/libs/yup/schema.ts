import * as yup from "yup"

export const emailSchema = yup
  .string()
  .email("이메일 형식이 아닙니다.")
  .required("이메일은 필수항목 입니다.")

export const passwordSchema = yup
  .string()
  .min(8, "최소 길이는 7자 입니다.")
  .max(20, "최대 길이는 21자 입니다.")
  .matches(/[a-zA-Z]/, "영문자를 포함해주세요.")
  .matches(/\d/, "숫자를 포함해주세요.")
  .matches(/[!@#$%^&*()_+]/, "특수문자를 포함해주세요.")
  .required("비밀번호는 필수항목 입니다.")
