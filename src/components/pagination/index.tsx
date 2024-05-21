import { usePagination } from "./pagination.hook"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "../ui/button"
import { goToTop } from "./pagination.func"
import { CURRENT_PAGE, ITEM_TOTAL } from "@/constants"
import type { IsClickedButtonFT, OnClickNumBtnFT } from "./pagination.type"
/**
 * @notice
 * - props로 서버데이터의 길이값을 받아야합니다
 * - 현재는 임시데이터로333 입력해둔상태인데 후에 totalPageLength 라는 props를 추가해야 합니다.
 * - `<`와같은 4개의 화살표는 후에 아이콘으로 변경합니다.
 */
export const PageNationBtn = () => {
  const { page, pagenationBtnLength, totalPage, changeUrl } = usePagination({
    totalPageLength: ITEM_TOTAL,
  })

  const onClickEndBtn = () => {
    if (page !== +totalPage) {
      changeUrl({ urlKey: CURRENT_PAGE, value: `${totalPage}` })
      goToTop()
    }
  }
  const onClickStartBtn = () => {
    if (page !== 1) {
      changeUrl({ urlKey: CURRENT_PAGE, value: `1` })
      goToTop()
    }
  }
  const onClickPrevBtn = () => {
    if (page <= 1) return
    changeUrl({ urlKey: CURRENT_PAGE, value: `${page - 1}` })
    goToTop()
  }
  const onClickNextBtn = () => {
    if (page + 1 > totalPage) return
    changeUrl({ urlKey: CURRENT_PAGE, value: `${page + 1}` })
    goToTop()
  }

  const onClickNumBtn: OnClickNumBtnFT = ({ buttonNumber }) => {
    if (page !== buttonNumber) {
      changeUrl({ urlKey: CURRENT_PAGE, value: `${buttonNumber}` })
      goToTop()
    }
  }

  const isClickedButton: IsClickedButtonFT = ({ curPage, buttonNumber }) => {
    let result = false
    if (curPage === buttonNumber) {
      result = true
    }
    return result ? "default" : "outline"
  }
  const PagiNationButtons = () => {
    const startNum =
      Math.floor((page - 1) / pagenationBtnLength) * pagenationBtnLength + 1
    const endNum = Math.min(startNum + pagenationBtnLength - 1, totalPage)
    const buttonLength = endNum - startNum + 1
    return Array.from({ length: buttonLength }, (_, idx) => {
      const buttonNumber = idx + startNum
      return (
        <Button
          variant={isClickedButton({
            buttonNumber: buttonNumber,
            curPage: page,
          })}
          key={idx}
          onClick={() => onClickNumBtn({ buttonNumber: buttonNumber })}
        >
          {buttonNumber}
        </Button>
      )
    })
  }
  const ARROW_SIZE = "30px"
  return (
    <div className="flex max-w-[35rem] items-center gap-[1px] px-2 py-3 IPAD_PRO:gap-3">
      <ChevronsLeft size={ARROW_SIZE} onClick={onClickStartBtn} />
      <ChevronLeft size={ARROW_SIZE} onClick={onClickPrevBtn} />
      <PagiNationButtons />
      <ChevronRight size={ARROW_SIZE} onClick={onClickNextBtn} />
      <ChevronsRight size={ARROW_SIZE} onClick={onClickEndBtn} />
    </div>
  )
}
