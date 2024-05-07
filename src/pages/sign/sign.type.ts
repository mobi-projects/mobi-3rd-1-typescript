import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import type { UserDataType } from "@/types"

export type SignInDataType = Record<"userId" | "password", string>
export type OnSubmitLogInDataFT = (input: SignInDataType) => void
export type SignInDataReturnType = {
  info: object
  token: string
  userId: string
}
export type PostUserSignInFT = (
  input: SignInDataType,
) => Promise<SignInDataReturnType>

export type SignUpFormType = {
  [FORM_EMAIL]: string
  [FORM_PW]: string
  [FORM_PW_CONFIRM]: string
}
export type SignUpInputType = Omit<SignUpFormType, typeof FORM_PW_CONFIRM>
export type PostSignUpFT = (input: SignUpInputType) => Promise<UserDataType>
export type GenerateNewUserDataFT = (input: SignUpInputType) => UserDataType
