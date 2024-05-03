import { cn } from "@/libs/tailwind-css/tailwind-utils"
import { type FC } from "react"
import { useImgLoading } from "./deferable-img.hook"
import { deferableImgVariants } from "./deferable-img.style"
import type {
  DeferableImgPT,
  DeferableImgVariantsProps,
} from "./deferable-img.type"

export const DeferableImg: FC<DeferableImgPT> = ({
  radio,
  radius,
  size,
  src,
  ...rest
}: DeferableImgPT) => {
  const { isLoading } = useImgLoading({ ...{ src } })
  if (isLoading) return <SkeletonDeferableImg {...{ radio, size, radius }} />
  else return <Img {...{ radio, size, radius, src, ...rest }} />
}

/** `DeferableImg` 에서 분리시킬 (부품) 컴포넌트가 있다면, export 없이 이 아래(👇) 작성해주세요.! */

const Img: FC<DeferableImgPT> = ({ radio, radius, size, src, ...rest }) => (
  <img
    className={deferableImgVariants({ radio, size, radius })}
    {...{ src }}
    {...rest}
  />
)
const SkeletonDeferableImg: FC<DeferableImgVariantsProps> = ({
  radio,
  radius,
  size,
}) => {
  return (
    <div
      className={cn(
        deferableImgVariants({ radio, size, radius }),
        "flex animate-spin items-center justify-center bg-black text-white",
      )}
    >
      <h1>로딩 중....</h1>
    </div>
  )
}
