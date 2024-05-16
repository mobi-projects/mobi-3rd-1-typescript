import { shallowCopy } from "@/funcs"
import {
  handleConfigBeforeSend,
  handleFailedResponse,
} from "./base-instance.func"
import { SetInterceptorFT } from "./base-instance.type"

export const setReqInterceptor: SetInterceptorFT = ({ instance }) => {
  const _instance = shallowCopy({ obj: instance })

  _instance.interceptors.request.use((config) =>
    handleConfigBeforeSend({ config }),
  )

  return _instance
}

export const setResInterceptor: SetInterceptorFT = ({ instance }) => {
  const _instance = shallowCopy({ obj: instance })

  _instance.interceptors.response.use(
    (response) => response,
    (error) => handleFailedResponse({ error }),
  )

  return _instance
}
