import { FORM_NICKNAME } from "@/constants"
import { AxiosResponse } from "axios"

export type UpdataDataType = Record<"nickName", string>

export type UpdateUserFormType = {
  [FORM_NICKNAME]: string
}
export type PatchProfileFT = (input: FormData) => Promise<AxiosResponse>
export type PatchUserFT = (input: UpdateUserFormType) => Promise<AxiosResponse>
