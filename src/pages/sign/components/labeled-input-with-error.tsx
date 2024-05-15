import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import type { FC } from "react"
import type {
  ErrorMsgPT,
  LabeledInputWithErrorPT,
  SignFormType,
} from "../sign.type"
import { capitalize, isFieldError, isUndefined } from "@/funcs"

export const LabeledInputWithError = <T extends SignFormType>({
  register,
  errors,
  label,
  inputProps,
}: LabeledInputWithErrorPT<T>) => {
  const capitalizedLebel = capitalize({ word: label })
  const errorField = errors[label]

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label>{capitalizedLebel}</Label>
      <Input
        {...register(label)}
        placeholder={capitalizedLebel}
        autoComplete="off"
        {...inputProps}
      />
      {isFieldError(errorField) && <ErrorMsg errorField={errorField} />}
    </div>
  )
}

const ErrorMsg: FC<ErrorMsgPT> = ({ errorField }) => {
  let errorMsg = "*" + errorField?.message
  if (isUndefined(errorField)) errorMsg = ""
  return (
    <div className="h-6 w-full">
      <p className="text-[10px] text-red-600">{errorMsg}</p>
    </div>
  )
}
