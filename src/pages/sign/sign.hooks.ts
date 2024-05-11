import {
  MUTATION_KEY_SIGN_IN,
  MUTATION_KEY_SIGN_UP,
  PATH_HOME,
  PATH_SIGN,
  QUERY_KEY_USER,
} from "@/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { postSignUp, postUserSignIn } from "./sign.func"

import type { SignFormType } from "./sign.type"

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignFormType>()

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
  const { mutate: signUp } = useMutation({
    mutationKey: [MUTATION_KEY_SIGN_UP],
    mutationFn: (signForm: SignFormType) => postSignUp(signForm),
    onSuccess: () => {
      alert("회원가입에 성공했습니다.")
      navigate(PATH_SIGN, { replace: true })
    },
    onError: () => {
      alert("회원가입에 실패했습니다.")
    },
  })
  return { signUp }
}
