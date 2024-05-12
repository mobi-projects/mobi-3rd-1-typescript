import { ErrorFallback } from "@/components/error-fallback"
import { Header } from "@/components/header"
import { PATH_SIGN } from "@/constants"
import { AUTH_TOKEN } from "@/constants/auth-key"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Outlet, useNavigate } from "react-router-dom"

export const AuthRoute = () => {
  const navigate = useNavigate()
  const { reset } = useQueryErrorResetBoundary()

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTH_TOKEN)
    if (!!!accessToken) {
      navigate(PATH_SIGN)
    }
  }, [])
  return (
    <>
      <Header />
      <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>
    </>
  )
}
