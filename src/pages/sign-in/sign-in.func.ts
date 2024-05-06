import { AUTH_REFRESH, AUTH_TOKEN } from "@/constants/auth-key"
import { API_SIGN_IN, API_SIGN_OUT } from "@/constants/server-endpoint"
import { baseAxiosInstance } from "@/libs/axios"

type SignInDataType = Record<"userId" | "password", string>
type SignInDataReturnType = { info: object; token: string; userId: string }
type postUserSignInFT = (input: SignInDataType) => Promise<SignInDataReturnType>

export const postUserSignIn: postUserSignInFT = async ({
  password,
  userId,
}) => {
  try {
    const response = await baseAxiosInstance.post(API_SIGN_IN, {
      password,
      userId,
    })
    localStorage.setItem(AUTH_TOKEN, response.data.token) // 로그인성공시 스토리지에 token저장
    return response.data
  } catch (err) {
    throw console.log(err)
  }
}

export const getUserRefreshToken = async (): Promise<string> => {
  try {
    const response = await baseAxiosInstance.get(AUTH_REFRESH)
    localStorage.setItem(AUTH_TOKEN, response.data.token) // 성공시스토리지에 token저장
    return response.data.token
  } catch (err) {
    throw console.log(err)
  }
}

export const postUserSignOut = async () => {
  let result = false
  try {
    const response = await baseAxiosInstance.post(API_SIGN_OUT)
    if (response.status === 200) {
      localStorage.clear()
      result = true
    } else {
      alert("로그아웃 실패 refactor에서 다루자")
    }
    return result
  } catch (err) {
    console.log(err)
    return result
  }
}
