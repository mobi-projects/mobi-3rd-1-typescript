import { AUTH_KEY, AUTH_PAIR_NUM, AUTH_TOKEN } from "@/constants/auth-key"
import axios from "axios"

/** peanut 서버 */
export const baseAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_MOBI,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: AUTH_KEY,
    pair: AUTH_PAIR_NUM,
  },
  withCredentials: true,
})

// 모든 요청을 시작하기 전에 실행됨
baseAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN) // 세션에서 토큰을 가져옴.
    if (token) {
      // 토큰이 존재하면, 요청 헤더에 Authorization 추가합니다.
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config // 수정된 설정으로 요청을 계속 진행
  },
  (error) => {
    // 요청 설정 시 오류가 발생하면, 호출하는 쪽으로 오류를 전달
    alert("토큰전송실패")
    return Promise.reject(error)
  },
)

// // 모든 요청이 실행된 후
// // 401에러. 토큰이 만료되었을 경우
// baseAxiosInstance.interceptors.response.use(
//   (response) => response, // 응답을 그대로 반환
//   async (error) => {
//     const originalRequset = error.config // 원본 요청 설정을 가져옴

//     // 오류 응답이 401일 때, 전에 재시도하지 않았다면 새로운 토큰을 요청
//     if (error.response.status === 401 && !originalRequset._retry) {
//       originalRequset._retry = true // 재시도 표시
//       try {
//         const response = await refreshAccessToken() // 새로운 accessToken 발급

//         // 새 토큰으로 요청 헤더 업데이트
//         originalRequset.headers["Authorization"] = `Bearer ${response}`

//         // 업데이트된 토큰으로 원본 요청을 다시 시도
//         return baseAxiosInstance(originalRequset)
//       } catch (refreshError) {
//         // 토큰 새로고침에 실패 시 로그인 페이지로 이동
//         alert("권한이없습니다")
//         window.location.href = "sign-in-page"
//         return Promise.reject(refreshError) // 오류 반환
//       }
//     }
//     // 다른 오류 반환
//     return Promise.reject(error)
//   },
// )

/** aladin api */
export const aladinAxiosInstance = () =>
  axios.create({
    baseURL: "/aladin/ttb/api/ItemList.aspx",
    params: {
      ttbkey: import.meta.env.VITE_API_ALADIN_SERVICE_KEY,
      Output: "JS",
      Version: 20131101,
      MaxResults: 15,
      SearchTarget: "Book",
      Cover: "Big",
    },
  })
