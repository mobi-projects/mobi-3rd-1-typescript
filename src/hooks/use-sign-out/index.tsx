import { useDialog } from "@/components/dialog/dialog.hook"
import {
  AUTH_TOKEN,
  MUTATION_KEY_SIGN_OUT,
  PATH_SIGN,
  QUERY_KEY_USER,
} from "@/constants"
import { removeFromLocalStorage } from "@/funcs"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { postUserSignOut } from "./use-sign-out.func"

export const useSignOut = () => {
  const queryClient = new QueryClient()
  const navigate = useNavigate()
  const { onAlert } = useDialog()
  const { mutate: logout } = useMutation({
    mutationKey: [MUTATION_KEY_SIGN_OUT],
    mutationFn: () => postUserSignOut(),
    onSettled: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY_USER] })
      removeFromLocalStorage({ key: AUTH_TOKEN })
      onAlert({ children: "로그아웃에 성공하셨습니다." })
      navigate(PATH_SIGN)
    },
  })

  return { logout }
}
