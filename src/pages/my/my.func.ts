import { API_UPDATE_USER_INFO } from "@/constants/server-endpoint"
import { baseAxiosInstance } from "@/libs/axios"

import type { PatchUserInfoFT, PatchUserUpdateInfoFT } from "./my.type"

export const patchUserInfo: PatchUserInfoFT = async () => {
  try {
    const response = await baseAxiosInstance.patch(API_UPDATE_USER_INFO)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const patchUserUpdateInfo: PatchUserUpdateInfoFT = async (newData) => {
  try {
    const response = await baseAxiosInstance.patch(API_UPDATE_USER_INFO, {
      data: { ...newData },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
}
