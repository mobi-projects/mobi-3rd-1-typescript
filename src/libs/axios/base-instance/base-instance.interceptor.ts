import { AUTH_TOKEN } from "@/constants"
import { getFromLocalStorage, shallowCopy } from "@/funcs"
import { baseAxiosInstance } from "."
import { handleFailedResponse, loadTokenIntoHeader } from "./base-instance.func"

baseAxiosInstance.interceptors.request.use((request) => {
  let _request = shallowCopy({ obj: request })
  const accessToken = getFromLocalStorage({ key: AUTH_TOKEN })
  _request = loadTokenIntoHeader({
    requestConfig: _request,
    token: accessToken,
  })
  return _request
})

baseAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleFailedResponse({ error }),
)
