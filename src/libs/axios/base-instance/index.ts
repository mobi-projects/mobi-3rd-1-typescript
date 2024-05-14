import type { AxiosRequestConfig } from "axios"
import axios from "axios"

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

export const baseAxiosInstance = axios.create(defaultConfig)
