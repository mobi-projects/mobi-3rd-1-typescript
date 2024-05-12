import {
  API_UPDATE_PROFILE,
  API_UPDATE_USER_INFO,
} from "@/constants/server-endpoint"
import { baseAxiosInstance } from "@/libs/axios"
import type { ConvertAxiosResFT, UserType } from "@/types"
import type { PatchProfileFT, PatchUserFT } from "./my.type"

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
/**
 * 사용자 프로필을 업데이트합니다.
 */
export const patchProfileOnPeanut: PatchProfileFT = async (
  formData: FormData,
) => {
  const response = await baseAxiosInstance.patch(API_UPDATE_PROFILE, formData, {
    headers: { "content-type": "multipart/form-data" },
  })
  return response
}
/**
 * patchUserOnPeanut 의 결과를 User 타입으로 변환합니다.
 */
export const convertPatchUserResToUser: ConvertAxiosResFT<UserType> = ({
  response,
}) => {
  const email = response.data.userId
  const profileUrl = response.data.profileUrl
  const nickname = response.data.data.nickname

  const user: UserType = {
    email,
    profileUrl,
    nickname,
  }
  return user
}
/**
 * patchProfileOnPeanut 의 결과에서 프로필 이미지 주소를 추출합니다.
 */
export const extractProfile: ConvertAxiosResFT<string> = ({ response }) =>
  response.data.profileUrl
