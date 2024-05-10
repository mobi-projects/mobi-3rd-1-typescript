import { useForm } from "react-hook-form"
import { postSignUp, postUserSignIn } from "./sign.func"
import { useNavigate } from "react-router-dom"
import { PATH_HOME, PATH_SIGN } from "@/constants"
import { useMutation } from "@tanstack/react-query"

import type {
  OnSubmitLogInDataFT,
  SignInDataType,
  SignUpInputType,
} from "./sign.type"

export const useSignIn = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInDataType>()

  const onSubmitLogInData: OnSubmitLogInDataFT = async (data) => {
    try {
      const response = await postUserSignIn(data)
      if (response) {
        navigate(PATH_HOME)
      }
    } catch {
      alert("로그인실패 후에 다른 액션으로 수정하자")
    }
  }
  return { register, handleSubmit, onSubmitLogInData, errors, isValid }
}

export const useMutationSignUp = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: [],
    mutationFn: (signUpInput: SignUpInputType) => postSignUp(signUpInput),
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      navigate(PATH_SIGN)
    },
  })
}
