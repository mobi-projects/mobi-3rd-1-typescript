import { VariantProps } from "class-variance-authority"
import { ImgHTMLAttributes } from "react"
import { deferableImgVariants } from "./deferable-img.style"

export type DeferableImgVariantsProps = VariantProps<
  typeof deferableImgVariants
>

export type DeferableImgPT = ImgHTMLAttributes<HTMLImageElement> &
  DeferableImgVariantsProps & { src: string }

export type useImgLoadingFT = (input: { src: string }) => { isLoading: boolean }
