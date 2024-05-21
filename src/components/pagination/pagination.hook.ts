import { useSearchParams } from "react-router-dom"

import type { ChangeUrlFT, usePaginationPorps } from "./pagination.type"
import { CURRENT_PAGE, ITEM_PERPAGE } from "@/constants"

export const usePagination: usePaginationPorps = ({ totalPageLength }) => {
  const [urlParams, setUrlParams] = useSearchParams()

  const page = +(urlParams?.get(CURRENT_PAGE) ?? 1)
  const pagenationBtnLength = 5
  const totalPage = Math.ceil(totalPageLength / ITEM_PERPAGE)

  /**
   * @param urlkey - 주소의 어떤값을 변경할건지 입력받습니다.
   * @param value - 해당 url의 바꿀 값을 입력합니다
   * @description - 주소의 key값과 key에맞는 새로 바꿀 value값을 받아서 주소값을 설정하는 함수입니다.
   */
  const changeUrl: ChangeUrlFT = ({ urlKey, value }) => {
    urlParams.set(urlKey, value)
    setUrlParams(urlParams)
  }

  return { page, pagenationBtnLength, totalPage, changeUrl }
}
