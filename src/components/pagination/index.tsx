import { usePaginationEvent, usePaginationInfo } from "./pagination.hook"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "../ui/button"
import { isClickedButton } from "./pagination.func"
import type { ArrowIconPT } from "./pagination.type"

export const PageNavigation = () => {
  const { onClickEndBtn, onClickNextBtn, onClickPrevBtn, onClickStartBtn } =
    usePaginationEvent()
  return (
    <div className="flex w-[22rem] items-center justify-between gap-[1px] px-2 py-3 IPAD_PRO:w-[30rem] ">
      <ArrowIcon icon={ChevronsLeft} clickCallback={onClickStartBtn} />
      <ArrowIcon icon={ChevronLeft} clickCallback={onClickPrevBtn} />
      <PagiNationButtons />
      <ArrowIcon icon={ChevronRight} clickCallback={onClickNextBtn} />
      <ArrowIcon icon={ChevronsRight} clickCallback={onClickEndBtn} />
    </div>
  )
}

const PagiNationButtons = () => {
  const { page, buttonLength, startNum } = usePaginationInfo()
  const { onClickNumBtn } = usePaginationEvent()
  return Array.from({ length: buttonLength }, (_, idx) => {
    const buttonNumber = idx + startNum
    const isClicked = isClickedButton({
      buttonNumber: buttonNumber,
      curPage: page,
    })
    return (
      <Button
        variant={isClicked}
        key={idx}
        onClick={() => onClickNumBtn({ buttonNumber: buttonNumber })}
        className="w-10"

      >
        {buttonNumber}
      </Button>
    )
  })
}

const ArrowIcon = ({ icon: Icon, clickCallback }: ArrowIconPT) => {
  return <Icon onClick={clickCallback} size={"30px"} />
}
