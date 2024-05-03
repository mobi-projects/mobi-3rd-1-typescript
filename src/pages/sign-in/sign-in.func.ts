import { API_SIGNIN, AUTH_TOKEN } from "@/constants/auth-key"
import { baseAxiosInstance } from "@/libs/axios"

type SigninDataType = Record<"userId" | "password", string>
type postUserSigninFT = (input: SigninDataType) => Promise<{}>
export const postUserSignin: postUserSigninFT = async ({
  password,
  userId,
}) => {
  try {
    const response = await baseAxiosInstance.post(API_SIGNIN, {
      password,
      userId,
    })
    localStorage.setItem(AUTH_TOKEN, response.data.token) // 로그인성공시 스토리지에 token저장
    return response.data
  } catch (err) {
    throw console.log(err)
  }
}
