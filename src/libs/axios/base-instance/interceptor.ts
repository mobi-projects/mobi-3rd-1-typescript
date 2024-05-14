import { AUTH_TOKEN, PATH_SIGN } from "@/constants"
import { baseAxiosInstance } from "."

baseAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    if (token) config.headers["Authorization"] = `Bearer ${token}`
    return config
  },
  (error) => {
    alert("토큰전송실패")
    return Promise.reject(error)
  },
)

baseAxiosInstance.interceptors.response.use(
  (response) => response, // 응답을 그대로 반환
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // 재시도 표시
      try {
        const response = await getUserRefreshToken() // 새로운 accessToken 발급
        // 새 토큰으로 요청 헤더 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${response}`

        // 업데이트된 토큰으로 원본 요청을 다시 시도
        return baseAxiosInstance(originalRequest)
      } catch (refreshError) {
        alert("권한이없습니다")
        window.location.href = PATH_SIGN
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)
