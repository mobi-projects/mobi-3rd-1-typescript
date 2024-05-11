import { QUERY_KEY_USER, QUERY_KEY_USER_INFO } from "@/constants/query-key"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import {
  convertPatchUserRes,
  patchUserImage,
  patchUserOnPeanut,
} from "./my.func"
import type { UpdataDataType, UpdateUserFormType } from "./my.type"

export const useMutateUpdateUser = () => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useMutation({
    mutationFn: (updateForm: UpdateUserFormType) =>
      patchUserOnPeanut(updateForm),
    onSuccess: (data) => {
      const user = convertPatchUserRes({ response: data }) // axios 결과를 user 객체로 변환
      queryClient.setQueryData([QUERY_KEY_USER], user) // 캐싱데이터 갱신
      alert("사용자 정보를 갱신했습니다.") // 사용자에게 알림
    },
    onError: () => {
      alert("사용자 정보 갱신에 실패했습니다.")
    },
  })
  return { updateUser }
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
  } = useForm<UpdataDataType>({ mode: "onChange" })
  return { register, handleSubmit }
}

/**
 * @description
 * - 유저 프로필이미지 업데이트 hook입니다.
 * - patchUserImage() 함수를 실행하면 서버로 이미지업로드 patch요청이 진행됩니다.
 * - 서버요청을 성공하면 onSuccess() 를실행해서  queryKey: [QUERY_KEY_USER_INFO] 를 재조회해서 현재 패칭된 data정보를 갱신합니다.
 */
export const useUpdateUserImage = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (data: FormData) => patchUserImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] })
    },
    onError: (err) => {
      console.log("뮤테이션실패")
      console.log(err)
    },
  })

  return { mutate }
}
