import { SORT_OPTION } from "@/constants/url-keys"
import { useState, useRef } from "react"
import { useSearchParams } from "react-router-dom"

export type DropDown = {
  isOpen: boolean
  boxRef: HTMLDivElement
  onClickTrigger: () => void
  onClickItems: () => void
  onClickWrapper: () => void
  urlParams: URLSearchParams
}

export const useDropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [urlParams, setUrlParams] = useSearchParams()

  const boxRef = useRef<HTMLDivElement>(null)
  const onClickTrigger = () => {
    setIsOpen((prev) => !prev)
  }

  const onClickItems = ({ item }: { item: string }) => {
    urlParams.set(SORT_OPTION, item)
    setUrlParams(urlParams)
    setIsOpen(false)
  }
  const onClickWrapper = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    boxRef,
    onClickWrapper,
    onClickTrigger,
    onClickItems,
    urlParams,
  }
}
