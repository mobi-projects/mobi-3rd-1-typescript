import { API_SIGN_UP } from "@/constants"
import { baseAxiosInstance } from "@/libs/axios"
import type { UserDataType } from "@/types"
import type { SignUpInputType } from "./sign-up.type"

export type PostSignUpFT = (input: SignUpInputType) => Promise<UserDataType>

export const postSignUp: PostSignUpFT = async ({ email, password }) => {
  const newUserData = generateNewUserData({ email, password })
  try {
    const response = await baseAxiosInstance.post<UserDataType>(
      API_SIGN_UP,
      newUserData,
    )
    return response.data
  } catch (e) {
    throw new Error("네트워크 문제로 인하여, 회원가입에 실패했습니다.")
  }
}

type GenerateNewUserDataFT = (input: SignUpInputType) => UserDataType

/**
 * 새로 가입할 사용자의 데이터를 객체화하여 반환합니다.
 */
const generateNewUserData: GenerateNewUserDataFT = ({ email, password }) => {
  const newUserData = {
    userId: email,
    password: password,
    data: {
      nickName: ".",
      location: ".",
    },
  }
  return newUserData
}
