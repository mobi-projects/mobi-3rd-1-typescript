import {
  API_REFRESH,
  API_SIGN_IN,
  API_SIGN_OUT,
  API_SIGN_UP,
} from "@/constants"

/** 엑세스 토큰을 갱신하지 않는 end-point 배열입니다. */
export const REFRESH_BLACKLIST = [
  API_SIGN_IN,
  API_SIGN_OUT,
  API_REFRESH,
  API_SIGN_UP,
] as const
