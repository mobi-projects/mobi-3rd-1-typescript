import { AUTH_TOKEN, PATH_SIGN, QUERY_KEY_USER } from "@/constants"
import { removeFromLocalStorage } from "@/funcs"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { postUserSignOut } from "./use-sign-out.func"

export const useSignOut = () => {
  const queryClient = new QueryClient()
  const navigate = useNavigate()

  const { mutate: logout } = useMutation({
    mutationKey: ["mutation-sign-out"],
    mutationFn: () => postUserSignOut(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] })
      removeFromLocalStorage({ key: AUTH_TOKEN })
      alert("로그아웃에 성공하셨습니다.")
      navigate(PATH_SIGN)
    },
  })

  return { logout }
}
