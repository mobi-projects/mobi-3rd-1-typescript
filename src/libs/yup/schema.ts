import * as yup from "yup"

export const emailSchema = yup
  .string()
  .email("이메일 형식이 아닙니다.")
  .required("이메일은 필수항목 입니다.")

export const passwordSchema = yup
  .string()
  .min(7, "최소 길이는 7자 입니다.")
  .max(21, "최대 길이는 21자 입니다.")
  .matches(/[a-zA-Z]/, "영문자를 포함해주세요.")
  .matches(/\d/, "숫자를 포함해주세요.")
  .matches(/[!@#$%^&*()_+]/, "특수문자를 포함해주세요.")
  .required("비밀번호는 필수항목 입니다.")

export const passwordConfirmSchema = yup
  .string()
  .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
  .required("비밀번호를 다시 입력해 주세요.")

export const ratingSchema = yup
  .number()
  .min(0, "부여할 수 있는 최소 점수는 0 점입니다.")
  .max(10, "부여할 수 있는 최대 점수는 10 점입니다.")
  .transform((val, orig) => (orig == "" ? undefined : val)) // 빈 값도 허용

export const commentSchema = yup
  .string()
  .min(5, "최소 길이는 5자 입니다.")
  .max(80, "최대 길이는 80자입니다.")
  .required("리뷰를 남길 경우, 댓글 작성은 필수입니다.")
