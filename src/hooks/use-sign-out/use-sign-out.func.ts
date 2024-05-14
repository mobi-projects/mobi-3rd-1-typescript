import { API_SIGN_OUT } from "@/constants"
import { baseAxiosInstance } from "@/libs/axios"

export const postUserSignOut = async () => {
  try {
    await baseAxiosInstance().post(API_SIGN_OUT)
  } catch {
    throw new Error("로그아웃에 실패했습니다.")
  }
}
