import { useDialog } from "@/components/dialog/dialog.hook"
import { QUERY_KEY_USER } from "@/constants/query-key"
import { isUndefined } from "@/funcs"
import { UserType } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import {
  convertPatchUserResToUser,
  extractProfile,
  patchProfileOnPeanut,
  patchUserOnPeanut,
} from "./my.func"
import type { UpdateUserFormType } from "./my.type"

export const useMutateUpdateUser = () => {
  const queryClient = useQueryClient()
  const { onAlert } = useDialog()
  const { mutate: updateUser } = useMutation({
    mutationFn: (updateForm: UpdateUserFormType) =>
      patchUserOnPeanut(updateForm),
    onSuccess: (data) => {
      const user = convertPatchUserResToUser({ response: data }) // axios 결과를 user 객체로 변환
      queryClient.setQueryData([QUERY_KEY_USER], user) // 캐싱데이터 갱신
      onAlert({ children: "사용자 정보를 갱신했습니다." })
    },
    onError: (error) => onAlert({ children: error.message }),
  })
  return { updateUser }
}

export const useMutateUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { onAlert } = useDialog()
  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: FormData) => patchProfileOnPeanut(data),
    onSuccess: (data) => {
      const profileUrl = extractProfile({ response: data })
      queryClient.setQueryData<UserType>([QUERY_KEY_USER], (prev) => {
        if (isUndefined(prev)) return prev
        return { ...prev, profileUrl }
      })
      onAlert({ children: "프로필 갱신에 성공했습니다." })
    },
    onError: (error) => onAlert({ children: error.message }),
  })
  return { updateProfile }
}

/**
 * @description form태그 제출을 위한 hook입니다.
 * @notice 전역적으로 사용될 여지가있는데 후에 다른 폴더에서 관리될수도 있습니다.
 */
export const useSubmitUpdateData = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<UpdateUserFormType>({ mode: "onChange" })
  return { register, handleSubmit }
}
