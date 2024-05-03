import { useEffect, useState } from "react"
import type { useImgLoadingFT } from "./deferable-img.type"

export const useImgLoading: useImgLoadingFT = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const imageData = new Image()
    imageData.src = src
    imageData.onload = () => setIsLoading(false)
  }, [src])
  return { isLoading }
}
