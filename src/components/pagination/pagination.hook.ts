import { SORT_PAGE, SORT_PERPAGE } from "@/constants/url-keys"
import { useSearchParams } from "react-router-dom"

import type { ChangeUrlFT, usePaginationPorps } from "./pagination.type"

/**
 * @notice
 * - 서버데이터의 전체 길이를 받아야합니다.
 * - pagenationBtnLength을 사용해서 한번에 몇개의 버튼을 보여줄지 정해야하는데 아직 설계가 없어서 일단 5개로 설정해두었고 추후에 props로 설정하게 바뀔수있습니다.
 */
export const usePagination: usePaginationPorps = ({ totalPageLength }) => {
  const [urlParams, setUrlParams] = useSearchParams()

  const perPage = +(urlParams?.get(SORT_PERPAGE) ?? 20)
  const page = +(urlParams?.get(SORT_PAGE) ?? 1)
  const pagenationBtnLength = 5
  const totalPage = Math.ceil(totalPageLength / perPage)

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
