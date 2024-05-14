import { API_REFRESH, AUTH_TOKEN, PATH_SIGN, UNAUTHORIZED } from "@/constants"
import {
  getFromLocalStorage,
  isUndefined,
  saveToLocalStorage,
  shallowCopy,
} from "@/funcs"
import type { ConvertAxiosResFT } from "@/types"
import { baseAxiosInstance } from "."
import type {
  HandleFailedResponse,
  HandleReqConfigBeforeSendFT,
  IsTokenNotFreshFT,
  LoadTokenIntoHeaderFT,
} from "./base-instance.type"

/**
 * 요청 보내기 전, 처리
 */
export const handleConfigBeforeSend: HandleReqConfigBeforeSendFT = ({
  config,
}) => {
  let _config = shallowCopy({ obj: config })
  const accessToken = getFromLocalStorage({ key: AUTH_TOKEN })
  _config = loadTokenIntoHeader({
    requestConfig: _config,
    token: accessToken,
  })
  return _config
}
/**
 * 응답 실패시 처리
 */
export const handleFailedResponse: HandleFailedResponse = async ({ error }) => {
  const _error = shallowCopy({ obj: error })

  const response = _error.response
  const request = _error.request
  const instanceConfig = _error.config

  if (isUndefined(response)) return Promise.reject(_error)
  if (isUndefined(request)) return Promise.reject(_error)
  if (isUndefined(instanceConfig)) return Promise.reject(_error)

  if (isTokenNotFresh({ response })) {
    const refreshedToken = await getRefreshedToken()
    saveToLocalStorage({ key: AUTH_TOKEN, value: refreshedToken })
    const newConfig = loadTokenIntoHeader({
      requestConfig: instanceConfig,
      token: refreshedToken,
    })
    return baseAxiosInstance()(newConfig)
  } else {
    window.location.href = PATH_SIGN
    return Promise.reject(_error)
  }
}
/**
 * 요청에 토큰을 싣습니다.
 */
export const loadTokenIntoHeader: LoadTokenIntoHeaderFT = ({
  requestConfig,
  token,
}) => {
  const _config = shallowCopy({ obj: requestConfig })
  if (!!token) _config.headers["Authorization"] = `Bearer ${token}`
  return _config
}
/**
 * 새로 갱신한 토큰을 반환합니다.
 */
const getRefreshedToken = async () => {
  const response = await baseAxiosInstance().get(API_REFRESH)
  const accessToken = extractAccessToken({ response })
  return accessToken
}
/**
 * 응답에서 엑세스토큰을 추출합니다.
 */
export const extractAccessToken: ConvertAxiosResFT<string> = ({ response }) => {
  return response.data.token as string
}
/**
 * 응답의 정보를 확인해, 토큰의 만료 여부를 확인합니다.
 * - true : 토큰 만료 (갱신 필요)
 * - false : 토큰 사용 가능
 */
export const isTokenNotFresh: IsTokenNotFreshFT = ({ response }) => {
  return response.status === UNAUTHORIZED
}
