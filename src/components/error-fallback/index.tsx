import MainLogo from "@/assets/main-logo.webp"
import { FC } from "react"
import type { FallbackProps } from "react-error-boundary"
import { Button } from "../ui/button"

export const ErrorFallback: FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <div className="flex h-[80dvh] w-full flex-col items-center justify-center gap-6">
      <img src={MainLogo} className="aspect-square h-4/6" />
      <h1 className="text-lg font-light ">😰 오류가 발생했습니다...</h1>
      <Button onClick={() => resetErrorBoundary()}>다시 시도하기 ＞</Button>
    </div>
  )
}
