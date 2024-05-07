import { useDialog } from "@/components/dialog/dialog.hook"
import { PATH_SIGN_IN } from "@/constants"
import type { UserDataType } from "@/types"
import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { postSignUp } from "./sign-up.func"
import type { SignUpInputType } from "./sign-up.type"

export type UseMutationSignUpFT = () => UseMutationResult<UserDataType, Error>

export const useMutationSignUp = () => {
  const navigate = useNavigate()
  const { onAlert } = useDialog()
  return useMutation({
    mutationKey: [],
    mutationFn: (signUpInput: SignUpInputType) => postSignUp(signUpInput),
    onError: (error) => {
      console.error(error)
      onAlert({
        children: "다시 시도해주세요.",
        onConfirm: () => {},
      })
    },
    onSuccess: () => {
      onAlert({
        children: "축하합니다. 회원가입에 성공하셨습니다.",
        onConfirm: () => {},
      })
      navigate(PATH_SIGN_IN)
    },
  })
}
