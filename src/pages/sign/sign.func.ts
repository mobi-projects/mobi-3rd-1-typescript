import { AUTH_REFRESH, AUTH_TOKEN } from "@/constants/auth-key"
import {
  API_SIGN_IN,
  API_SIGN_OUT,
  API_SIGN_UP,
} from "@/constants/server-endpoint"
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  replaceMidSubstringToStar,
  saveToLocalStorage,
  spliceString,
} from "@/funcs"
import { baseAxiosInstance } from "@/libs/axios"
import { UserType } from "@/types"
import type {
  ConvertSignResToUserFT,
  ExtractAccessTokenFT,
  GenerateNewUserDataFT,
  GenerateTempNicknameByEmailFT,
  GetRefreshTokenFT,
  PostSignUpFT,
  PostUserSignInFT,
  SignUpRequestType,
} from "./sign.type"

/**
 * accessToken 을 갱신합니다.
 */
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
/**
 * 로그아웃
 * - 성공 시, accessToken 을 제거합니다.
 * - 오류 발생 시, accessToken 을 원복합니다.
 */
export const postUserSignOut = async () => {
  const accessToken = getFromLocalStorage({ key: AUTH_TOKEN })
  try {
    await baseAxiosInstance.post(API_SIGN_OUT)
    removeFromLocalStorage({ key: AUTH_TOKEN })
  } catch {
    saveToLocalStorage({ key: AUTH_TOKEN, value: accessToken })
    throw new Error("로그아웃에 실패했습니다.")
  }
}
/**
 * 회원가입
 */
export const postSignUp: PostSignUpFT = async ({ email, password }) => {
  const initNickname = generateTempNicknameByEmail({ email })
  const newUserData = generateNewUserData({
    email,
    password,
    nickName: initNickname,
  })
  try {
    const response = await baseAxiosInstance.post(API_SIGN_UP, newUserData)
    return response.data
  } catch (e) {
    throw new Error("네트워크 문제로 인하여, 회원가입에 실패했습니다.")
  }
}

/**
 * 새로 가입할 사용자의 데이터를 객체화하여 반환합니다.
 */
const generateNewUserData: GenerateNewUserDataFT = ({
  email,
  password,
  nickName,
}) => {
  const newUserData: SignUpRequestType = {
    userId: email,
    password: password,
    data: {
      nickName,
    },
  }
  return newUserData
}
/**
 * 이메일을 기반으로 nickname 을 임시로 생성합니다.
 * - 이메일을 8 자리로 문자열로 자릅니다. (이메일이 8자 미만이라면, 자르지 않습니다.)
 * - 가장 앞의 2 자리를 제외하고 모두 '*' 로 대체합니다.
 */
const generateTempNicknameByEmail: GenerateTempNicknameByEmailFT = ({
  email,
}) => {
  const resizedEmail = spliceString({ origin: email, length: 8 })
  const tempNickname = replaceMidSubstringToStar({
    origin: resizedEmail,
    excludeFront: 2,
  })
  return tempNickname
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
export const convertSignInResToUser: ConvertSignResToUserFT = ({
  response,
}) => {
  const user: UserType = {
    email: response.data.userId,
    nickname: response.data.info.nickname,
    profileUrl: response.data.info.profile,
  }
  return user
}

/**
 * signIn 의 response 를 User 객체 변환합니다.
 */
export const convertSignUpResToUser: ConvertSignResToUserFT = ({
  response,
}) => {
  const user: UserType = {
    email: response.data.userId,
    nickname: response.data.data.nickname,
    profileUrl: ".",
  }
  return user
}
