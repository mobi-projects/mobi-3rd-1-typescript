import { useDialog } from "@/components/dialog/dialog.hook"
import {
  MUTATION_KEY_SIGN_IN,
  PATH_HOME,
  PATH_SIGN,
  QUERY_KEY_USER,
} from "@/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { postSignUp, postUserSignIn } from "./sign.func"

import { yupResolver } from "@hookform/resolvers/yup"
import type { SignFormType } from "./sign.type"
import { signInSchema } from "./sign.yup-schema"

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignFormType>({
    mode: "onChange",
    resolver: yupResolver(signInSchema),
  })

  return { register, handleSubmit, errors, isValid }
}

export const useMutationSignIn = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationKey: [MUTATION_KEY_SIGN_IN],
    mutationFn: ({ email, password }: SignFormType) =>
      postUserSignIn({ email, password }),
    onSuccess: (data) => {
      const user = { ...data }
      alert(`${user.nickname} 님, 환영합니다.`)
      queryClient.setQueryData([QUERY_KEY_USER], user)
      navigate(PATH_HOME)
    },
    onError: (error) => alert(error.message),
  })
}

export const useMutationSignUp = () => {
  const navigate = useNavigate()
  const { onAlert } = useDialog()
  return useMutation({
    mutationKey: [],
    mutationFn: (signUpInput: SignFormType) => postSignUp(signUpInput),
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
      navigate(PATH_SIGN)
    },
  })
}
