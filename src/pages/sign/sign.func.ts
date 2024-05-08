import { AUTH_REFRESH, AUTH_TOKEN } from "@/constants/auth-key"
import {
  API_SIGN_IN,
  API_SIGN_OUT,
  API_SIGN_UP,
} from "@/constants/server-endpoint"
import { baseAxiosInstance } from "@/libs/axios"

import type {
  GenerateNewUserDataFT,
  PostSignUpFT,
  PostUserSignInFT,
} from "./sign.type"
import { UserDataType } from "@/types"

export const getUserRefreshToken = async (): Promise<string> => {
  try {
    const response = await baseAxiosInstance.get(AUTH_REFRESH)
    localStorage.setItem(AUTH_TOKEN, response.data.token) // 성공시스토리지에 token저장
    return response.data.token
  } catch (err) {
    throw console.log(err)
  }
}

export const postUserSignIn: PostUserSignInFT = async ({
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

/**
 * 새로 가입할 사용자의 데이터를 객체화하여 반환합니다.
 */
const generateNewUserData: GenerateNewUserDataFT = ({ email, password }) => {
  const newUserData = {
    userId: email,
    password: password,
    data: {
      nickName: ".",
    },
  }
  return newUserData
}
