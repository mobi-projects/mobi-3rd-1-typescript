import { AUTH_REFRESH, AUTH_TOKEN } from "@/constants/auth-key"
import {
  API_SIGN_IN,
  API_SIGN_OUT,
  API_SIGN_UP,
} from "@/constants/server-endpoint"
import { removeFromLocalStorage, saveToLocalStorage } from "@/funcs"
import { baseAxiosInstance } from "@/libs/axios"
import { UserDataType, UserType } from "@/types"
import type {
  ConvertSignInResToUserFT,
  ExtractAccessTokenFT,
  GenerateNewUserDataFT,
  GetRefreshTokenFT,
  PostSignUpFT,
  PostUserSignInFT,
} from "./sign.type"

export const getUserRefreshToken: GetRefreshTokenFT = async () => {
  try {
    const response = await baseAxiosInstance.get(AUTH_REFRESH)
    const accessToken = extractAccessToken({ response })
    saveToLocalStorage({ key: AUTH_TOKEN, value: accessToken })
    return accessToken
  } catch (e) {
    removeFromLocalStorage({ key: AUTH_TOKEN })
    throw new Error("accessToken 갱신에 실패했습니다.")
  }
}

/**
 * 로그인
 * - accessToken 은 로컬스토리지에 등록합니다.
 * - 유저 객체를 반환합니다.
 */
export const postUserSignIn: PostUserSignInFT = async ({
  password,
  userId,
}) => {
  try {
    const response = await baseAxiosInstance.post(API_SIGN_IN, {
      password,
      userId,
    })
    const accessToken = extractAccessToken({ response })
    saveToLocalStorage({ key: AUTH_TOKEN, value: accessToken })

    const user = convertSignInResToUser({ response })
    return user
  } catch (err) {
    throw new Error("로그인에 실패했습니다.")
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

/**
 * axios response 에서 accessToken 을 분리합니다.
 */
export const extractAccessToken: ExtractAccessTokenFT = ({ response }) => {
  return response.data.token
}

/**
 * signIn 의 response 를 User 객체 변환합니다.
 */
export const convertSignInResToUser: ConvertSignInResToUserFT = ({
  response,
}) => {
  const user: UserType = {
    email: response.data.userId,
    nickname: response.data.info.nickname,
    profileUrl: response.data.info.profile,
  }
  return user
}
