import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

export type HandleFailedResponse = (input: {
  error: AxiosError
}) => Promise<AxiosResponse>
export type IsTokenNotFreshFT = (input: { response: AxiosResponse }) => boolean
export type LoadTokenIntoHeaderFT = (input: {
  requestConfig: InternalAxiosRequestConfig
  token: string
}) => InternalAxiosRequestConfig
