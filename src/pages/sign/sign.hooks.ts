import { useDialog } from "@/components/dialog/dialog.hook"
import {
  MUTATION_KEY_SIGN_IN,
  MUTATION_KEY_SIGN_UP,
  PATH_HOME,
  QUERY_KEY_USER,
} from "@/constants"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { postSignUp, postUserSignIn } from "./sign.func"
import type { SignFormType, SignUpFormType } from "./sign.type"
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
  const { onAlert } = useDialog()
  return useMutation({
    mutationKey: [MUTATION_KEY_SIGN_IN],
    mutationFn: ({ email, password }: SignFormType) =>
      postUserSignIn({ email, password }),
    onSuccess: (data) => {
      const user = { ...data }
      onAlert({ children: `${user.nickname} 님, 환영합니다.` })
      queryClient.setQueryData([QUERY_KEY_USER], user)
      navigate(PATH_HOME)
    },
    onError: (error) => onAlert({ children: error.message }),
  })
}

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormType>()
  return { register, handleSubmit, errors, isValid }
}
export const useMutationSignUp = () => {
  const { onAlert } = useDialog()
  const { mutate: signUp } = useMutation({
    mutationKey: [MUTATION_KEY_SIGN_UP],
    mutationFn: (signForm: SignFormType) => postSignUp(signForm),
    onSuccess: () => {
      onAlert({ children: "회원가입에 성공했습니다." })
      window.location.reload()
    },
    onError: (error) => onAlert({ children: error.message }),
  })
  return { signUp }
}
