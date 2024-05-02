import { useState, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { getUrlkeyByOption } from "./dropdown.func"

import type { ClickCallbackFunc } from "./dropdown.types"

export const useDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [urlParams, setUrlParams] = useSearchParams()

  const boxRef = useRef<HTMLDivElement>(null)
  const onClickTrigger = () => {
    setIsOpen((prev) => !prev)
  }

  const onClickItems: ClickCallbackFunc = ({ item, option }) => {
    const urlKey = getUrlkeyByOption({ option: option })
    urlParams.set(urlKey, item)
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
