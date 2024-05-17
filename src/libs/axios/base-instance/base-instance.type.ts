import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

export type HandleReqConfigBeforeSendFT = (input: {
  config: InternalAxiosRequestConfig
}) => InternalAxiosRequestConfig
export type HandleFailedResponse = (input: {
  error: AxiosError
}) => Promise<AxiosResponse>
export type IsTokenNotFreshFT = (input: { response: AxiosResponse }) => boolean
export type LoadTokenIntoHeaderFT = (input: {
  requestConfig: InternalAxiosRequestConfig
  token: string
}) => InternalAxiosRequestConfig
export type SetInterceptorFT = (input: {
  instance: AxiosInstance
}) => AxiosInstance
export type IsPointInBlacklistFT = (input: { responseURL: string }) => boolean
