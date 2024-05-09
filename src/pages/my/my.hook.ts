import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY_USER_INFO } from "@/constants/query-key"
import { patchUserImage, patchUserInfo, patchUserUpdateInfo } from "./my.func"

import type { UpdataDataType, UserDataType } from "./my.type"

/**
 *@description user정보를 `조회`하기위한 hook입니다.
 */
export const useFetchingUserInfo = () => {
  const { data, isLoading } = useQuery<UserDataType>({
    queryKey: [QUERY_KEY_USER_INFO],
    queryFn: () => patchUserInfo(),
    staleTime: 5 * 60 * 1000, // 신선도 5분
    gcTime: 10 * 60 * 1000, // 삭제 10분설정
  })
  return { data, isLoading }
}
/**
 * @description modal에 입력한 정보를 서버로 업데이트하기 위한 mutation입니다.
 * @notice 아직 입력양식 , 실패시로직은 추가안된 상태입니다. 후에 수정해야합니다.
 */
export const useMutateUserInfo = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (data: UpdataDataType) => patchUserUpdateInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] })
    },
    onError: () => {
      alert("실패")
    },
  })
  return { mutate }
}

/**
 * @description form태그 제출을 위한 hook입니다.
 * @notice 전역적으로 사용될 여지가있는데 후에 다른 폴더에서 관리될수도 있습니다.
 */
export const useSubmitUpdateData = () => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors, isValid },
  } = useForm<UpdataDataType>({ mode: "onChange" })
  return { register, handleSubmit, reset }
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
