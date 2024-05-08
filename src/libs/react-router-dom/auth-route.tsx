import { PATH_SIGN } from "@/constants"
import { AUTH_TOKEN } from "@/constants/auth-key"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const AuthRoute = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTH_TOKEN)
    if (!!!accessToken) {
      navigate(PATH_SIGN)
    }
  }, [])
  return <Outlet />
}
