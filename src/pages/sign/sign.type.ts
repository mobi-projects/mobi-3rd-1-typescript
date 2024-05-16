import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import type { UserType } from "@/types"
import type { ComponentProps } from "react"
import type {
  FieldError,
  FieldErrors,
  Path,
  UseFormRegister,
} from "react-hook-form"

export type PostUserSignInFT = (input: SignFormType) => Promise<UserType>

export type PostSignUpFT = (input: SignFormType) => Promise<void>

export type GenerateNewUserDataFT = (input: {
  email: string
  password: string
  nickname: string
}) => SignUpRequestType

export type GenerateTempNicknameByEmailFT = (input: { email: string }) => string

export type GetRefreshTokenFT = () => Promise<string>

export type SignUpRequestType = {
  userId: string
  password: string
  data: {
    nickname: string
  }
}

export type SignFormType = {
  [FORM_EMAIL]: string
  [FORM_PW]: string
}

export type SignUpFormType = SignFormType & {
  [FORM_PW_CONFIRM]: string
}

export type SignInReqBodyType = {
  userId: string
  password: string
}

export type CreateSignInReqBodyFT = (input: SignFormType) => SignInReqBodyType

export type OnSubmitFormFT = (input: SignFormType) => void

export type ErrorMsgPT = { errorField?: FieldError }

export type LabeledInputWithErrorPT<T extends SignFormType> = {
  register: UseFormRegister<T>
  label: Path<T>
  errors: FieldErrors<T>
  inputProps?: ComponentProps<"input">
}
