import { API_SIGN_IN } from "@/constants"

/** 정상 응답아니더라도, 엑세스 토큰을 갱신하지 않는 end-point 배열입니다. */
export const REFRESH_BLACKLIST = [API_SIGN_IN] as const
