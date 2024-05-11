import { FORM_NICKNAME } from "@/constants"
import { AxiosResponse } from "axios"

export type UpdataDataType = Record<"nickName", string>

export type UserDataType = {
  data: UpdataDataType
  profileUrl: string | null
  userId: string
}

export type UpdateUserFormType = {
  [FORM_NICKNAME]: string
}

export type PatchUserFT = (input: UpdateUserFormType) => Promise<AxiosResponse>
