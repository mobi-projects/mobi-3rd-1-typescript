import { isUndefined } from "@/funcs"
import type { FC } from "react"
import type { ErrorMsgPT } from "../sign.type"

export const ErrorMsg: FC<ErrorMsgPT> = ({ errorField }) => {
  let errorMsg = "*" + errorField?.message
  if (isUndefined(errorField)) errorMsg = ""
  return (
    <div className="h-2 w-full">
      <p className="text-[10px] text-red-600">{errorMsg}</p>
    </div>
  )
}
