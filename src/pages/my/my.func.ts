import {
  API_UPDATE_USER_IMAGE,
  API_UPDATE_USER_INFO,
} from "@/constants/server-endpoint"
import { baseAxiosInstance } from "@/libs/axios"
import type { ConvertAxiosResFT, UserType } from "@/types"
import type { PatchUserFT } from "./my.type"

/**
 * 이메일, 비밀번호를 제외한 사용자 정보를 업데이트합니다.
 */
export const patchUserOnPeanut: PatchUserFT = async ({ nickname }) => {
  try {
    const response = await baseAxiosInstance.patch(API_UPDATE_USER_INFO, {
      data: { ...{ nickname } },
    })
    return response
  } catch {
    throw new Error("사용자 정보 업데이트에 실패했습니다.")
  }
}

export const patchUserImage = async (formData: FormData) => {
  await baseAxiosInstance.patch(API_UPDATE_USER_IMAGE, formData, {
    headers: { "content-type": "multipart/form-data" },
  })
}
/**
 * patchUserOnPeanut 의 결과를 User 타입으로 변환합니다.
 */
export const convertPatchUserRes: ConvertAxiosResFT<UserType> = ({
  response,
}) => {
  const email = response.data.userId
  const profileUrl = response.data.profileUrl
  const nickname = response.data.data.nickname
  console.log(email)
  console.log(profileUrl)
  console.log(nickname)
  const user: UserType = {
    email,
    profileUrl,
    nickname,
  }
  return user
}
