import { useSearchParams } from "react-router-dom"
import { CURRENT_PAGE, ITEM_PERPAGE, ITEM_TOTAL } from "@/constants"
import { isNull } from "@/funcs"
import { goToTop } from "./pagination.func"

import type {
  ChangeParamsValueFT,
  GetParamValue,
  OnClickNumBtnFT,
} from "./pagination.type"

export const useHandleUrlParams = () => {
  const [urlParams, setUrlParams] = useSearchParams()
  /**
   * @param urlkey - 주소의 어떤값을 변경할건지 입력받습니다.
   * @param value - 해당 url의 바꿀 값을 입력합니다
   * @description - 주소의 key값과 key에맞는 새로 바꿀 value값을 받아서 주소값을 설정하는 함수입니다.
   */
  const changeParamValue: ChangeParamsValueFT = ({ urlKey, value }) => {
    urlParams.set(urlKey, value)
    setUrlParams(urlParams)
  }
  /**
   * @param urlkey - 주소의 어떤값을 변경할건지 입력받습니다.
   * @description - 입력된 key값에 맞는 value가있다면 그값을 , 없다면 빈 문자열을 반환합니다.
   */
  const getParamValue: GetParamValue = ({ urlKey }) => {
    let param = urlParams.get(urlKey)
    if (isNull(param) && urlKey === CURRENT_PAGE) return "1"
    if (isNull(param)) return ""
    return param
  }
  return { changeParamValue, getParamValue }
}

export const usePaginationInfo = () => {
  const { getParamValue } = useHandleUrlParams()
  const page = +getParamValue({ urlKey: CURRENT_PAGE })
  const defaultBtnLength = 5
  const totalPage = Math.ceil(ITEM_TOTAL / ITEM_PERPAGE)
  const startNum =
    Math.floor((page - 1) / defaultBtnLength) * defaultBtnLength + 1
  const endNum = Math.min(startNum + defaultBtnLength - 1, totalPage)
  const buttonLength = endNum - startNum + 1

  return { page, buttonLength, totalPage, startNum, endNum }
}

export const usePaginationEvent = () => {
  const { changeParamValue } = useHandleUrlParams()
  const { page, totalPage, startNum, endNum, buttonLength } =
    usePaginationInfo()
    
  const onClickEndBtn = () => {
    if (page !== +totalPage) {
      changeParamValue({ urlKey: CURRENT_PAGE, value: `${totalPage}` })
      goToTop()
    }
  }
  const onClickStartBtn = () => {
    if (page !== 1) {
      changeParamValue({ urlKey: CURRENT_PAGE, value: `1` })
      goToTop()
    }
  }
  const onClickPrevBtn = () => {
    if (page <= 1 || endNum <= buttonLength) return
    changeParamValue({
      urlKey: CURRENT_PAGE,
      value: `${endNum - buttonLength}`,
    })
    goToTop()
  }
  const onClickNextBtn = () => {
    if (page + 1 > totalPage || startNum + buttonLength > totalPage) return
    changeParamValue({
      urlKey: CURRENT_PAGE,
      value: `${startNum + buttonLength}`,
    })
    goToTop()
  }
  const onClickNumBtn: OnClickNumBtnFT = ({ buttonNumber }) => {
    if (page !== buttonNumber) {
      changeParamValue({ urlKey: CURRENT_PAGE, value: `${buttonNumber}` })
      goToTop()
    }
  }
  return {
    onClickEndBtn,
    onClickStartBtn,
    onClickPrevBtn,
    onClickNextBtn,
    onClickNumBtn,
  }
}
