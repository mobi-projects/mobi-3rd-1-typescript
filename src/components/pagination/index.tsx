import { SORT_PAGE } from "@/constants/url-keys"

import { usePagination } from "./pagination.hook"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "../ui/button"
/**
 * @notice
 * - props로 서버데이터의 길이값을 받아야합니다
 * - 현재는 임시데이터로333 입력해둔상태인데 후에 totalPageLength 라는 props를 추가해야 합니다.
 * - `<`와같은 4개의 화살표는 후에 아이콘으로 변경합니다.
 */
export const PageNationBtn = () => {
  const { page, pagenationBtnLength, totalPage, changeUrl } = usePagination({
    totalPageLength: 333,
  })

  const onClickEndBtn = () => {
    if (page !== +totalPage) {
      changeUrl({ urlKey: SORT_PAGE, value: `${totalPage}` })
    }
  }
  const onClickStartBtn = () => {
    if (page !== 1) {
      changeUrl({ urlKey: SORT_PAGE, value: `1` })
    }
  }
  const onClickPrevBtn = () => {
    if (page <= 1) return
    changeUrl({ urlKey: SORT_PAGE, value: `${page - 1}` })
  }
  const onClickNextBtn = () => {
    if (page + 1 > totalPage) return
    changeUrl({ urlKey: SORT_PAGE, value: `${page + 1}` })
  }
  const onClickNumBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (page !== +e.currentTarget.id) {
      changeUrl({ urlKey: SORT_PAGE, value: `${e.currentTarget.id}` })
    }
  }

  const creatNumberBtn = () => {
    const startNum =
      Math.floor((page - 1) / pagenationBtnLength) * pagenationBtnLength + 1
    const endNum = Math.min(startNum + pagenationBtnLength - 1, totalPage)
    return Array.from({ length: endNum - startNum + 1 }, (_, idx) => (
      <Button
        variant={"outline"}
        key={idx}
        id={`${idx + startNum}`}
        onClick={(e) => {
          onClickNumBtn(e)
        }}
      >
        {startNum + idx}
      </Button>
    ))
  }
  const ARROW_SIZE = "30px"
  return (
    <div className="IPAD_PRO:gap-3 flex max-w-[35rem] items-center gap-[1px] px-2 py-3">
      <ChevronsLeft size={ARROW_SIZE} onClick={onClickStartBtn} />
      <ChevronLeft size={ARROW_SIZE} onClick={onClickPrevBtn} />
      <>{creatNumberBtn()}</>
      <ChevronRight size={ARROW_SIZE} onClick={onClickNextBtn} />
      <ChevronsRight size={ARROW_SIZE} onClick={onClickEndBtn} />
    </div>
  )
}
