import { useDialog } from "@/components/dialog/dialog.hook"
import { PATH_SIGN_IN } from "@/constants"
import { AUTH_TOKEN } from "@/constants/auth-key"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const AuthRoute = () => {
  const navigate = useNavigate()
  const { onAlert } = useDialog()

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTH_TOKEN)
    if (!!!accessToken) {
      onAlert({ children: "로그인 후, 이용해주세요 :)" })
      navigate(PATH_SIGN_IN)
    }
  }, [])
  return <Outlet />
}
