import { API_SIGN_IN, API_SIGN_UP } from "@/constants/server-endpoint"
import { replaceMidSubstringToStar, spliceString } from "@/funcs"
import { baseAxiosInstance } from "@/libs/axios/base-instance"
import { ConvertAxiosResFT, UserType } from "@/types"
import type {
  CreateSignInReqBodyFT,
  GenerateNewUserDataFT,
  GenerateTempNicknameByEmailFT,
  PostSignUpFT,
  PostUserSignInFT,
  SignInReqBodyType,
  SignUpRequestType,
} from "./sign.type"

/**
 * 로그인
 * - accessToken 은 로컬스토리지에 등록합니다.
 * - 유저 객체를 반환합니다.
 */
export const postUserSignIn: PostUserSignInFT = async ({ reqBody }) => {
  try {
    const response = await baseAxiosInstance().post(API_SIGN_IN, reqBody)
    return response
  } catch {
    throw new Error("로그인에 실패했습니다.")
  }
}
/**
 * 회원가입
 */
export const postSignUp: PostSignUpFT = async ({ email, password }) => {
  const nickname = generateTempNicknameByEmail({ email })
  const newUser = generateNewUserData({
    email,
    password,
    nickname,
  })
  try {
    await baseAxiosInstance().post(API_SIGN_UP, newUser)
  } catch {
    throw new Error("네트워크 문제로 인하여, 회원가입에 실패했습니다.")
  }
}
/**
 * 새로 가입할 사용자의 데이터를 객체화하여 반환합니다.
 */
const generateNewUserData: GenerateNewUserDataFT = ({
  email,
  password,
  nickname,
}) => {
  const newUserData: SignUpRequestType = {
    userId: email,
    password: password,
    data: {
      nickname,
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
export const extractAccessToken: ConvertAxiosResFT<string> = ({ response }) => {
  return response.data.token as string
}

/**
 * signIn 의 response 를 User 객체 변환합니다.
 */
export const convertSignInResToUser: ConvertAxiosResFT<UserType> = ({
  response,
}) => {
  const email = response.data.userId
  const nickname = response.data.info.nickname
  const profileUrl = response.data.info.profile

  const user: UserType = {
    email: email,
    nickname: nickname,
    profileUrl: profileUrl,
  }
  return user
}

export const createSignInReqBody: CreateSignInReqBodyFT = ({
  email,
  password,
}) => {
  const reqBody: SignInReqBodyType = {
    userId: email,
    password: password,
  }
  return reqBody
}
