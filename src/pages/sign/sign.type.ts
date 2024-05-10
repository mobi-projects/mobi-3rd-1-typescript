import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import type { UserType } from "@/types"
import { AxiosResponse } from "axios"

export type SignInDataType = Record<"userId" | "password", string>
export type OnSubmitLogInDataFT = (input: SignInDataType) => void
export type SignInDataReturnType = {
  info: object
  token: string
  userId: string
}
export type PostUserSignInFT = (input: SignInDataType) => Promise<UserType>

export type ConvertSignResToUserFT = (input: {
  response: AxiosResponse
}) => UserType

export type SignUpFormType = {
  [FORM_EMAIL]: string
  [FORM_PW]: string
  [FORM_PW_CONFIRM]: string
}
export type PostSignUpFT = (input: {
  email: "string"
  password: "string"
}) => Promise<UserType>

export type GenerateNewUserDataFT = (input: {
  email: string
  password: string
  nickName: string
}) => SignUpRequestType

export type GenerateTempNicknameByEmailFT = (input: { email: string }) => string

export type GetRefreshTokenFT = () => Promise<string>

export type ExtractAccessTokenFT = (input: {
  response: AxiosResponse
}) => string

export type SignUpRequestType = {
  userId: string
  password: string
  data: {
    nickName: string
  }
}
