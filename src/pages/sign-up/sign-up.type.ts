import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"

export type SignUpFormType = {
  [FORM_EMAIL]: string
  [FORM_PW]: string
  [FORM_PW_CONFIRM]: string
}
export type SignUpInputType = Omit<SignUpFormType, typeof FORM_PW_CONFIRM>
