import type { AxiosRequestConfig } from "axios"
import axios from "axios"
import {
  setReqInterceptor,
  setResInterceptor,
} from "./base-instance.interceptor"

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_MOBI,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apiKey: import.meta.env.VITE_API_MOBI_AUTH_KEY,
    pair: import.meta.env.VITE_API_MOBI_AUTH_NUM,
  },
  withCredentials: true,
}

export const baseAxiosInstance = () => {
  let baseInstance = axios.create(defaultConfig)
  baseInstance = setReqInterceptor({ instance: baseInstance })
  baseInstance = setResInterceptor({ instance: baseInstance })
  return baseInstance
}
