import { useDialog } from "@/components/dialog/dialog.hook"
import {
  AUTH_TOKEN,
  MUTATION_KEY_SIGN_IN,
  MUTATION_KEY_SIGN_UP,
  PATH_HOME,
  QUERY_KEY_USER,
} from "@/constants"
import { saveToLocalStorage } from "@/funcs"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {
  convertSignInResToUser,
  createSignInReqBody,
  extractAccessToken,
  postSignUp,
  postUserSignIn,
} from "./sign.func"
import type { SignFormType, SignUpFormType } from "./sign.type"
import { signInSchema, signUpSchema } from "./sign.yup-schema"

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
  const { mutate: signIn, ...rest } = useMutation({
    mutationKey: [MUTATION_KEY_SIGN_IN],
    mutationFn: ({ email, password }: SignFormType) => {
      const reqBody = createSignInReqBody({ email, password })
      return postUserSignIn({ reqBody })
    },
    onSuccess: (response) => {
      const accessToken = extractAccessToken({ response })
      saveToLocalStorage({ key: AUTH_TOKEN, value: accessToken })

      const user = convertSignInResToUser({ response })
      queryClient.setQueryData([QUERY_KEY_USER], user)
      onAlert({ children: `${user.nickname} 님, 환영합니다.` })
    },
    onError: (error) => onAlert({ children: error.message }),
    onSettled: () => navigate(PATH_HOME),
  })
  return { signIn, ...rest }
}

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormType>({
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
  })
  return { register, handleSubmit, errors, isValid }
}
export const useMutationSignUp = () => {
  const { onAlert } = useDialog()
  const { mutate: signUp, ...rest } = useMutation({
    mutationKey: [MUTATION_KEY_SIGN_UP],
    mutationFn: (signForm: SignFormType) => postSignUp(signForm),
    onSuccess: () => onAlert({ children: "회원가입에 성공했습니다." }),
    onError: (error) => onAlert({ children: error.message }),
  })
  return { signUp, ...rest }
}
