import { useHandleUrlParams, usePagination } from "./pagination.hook"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "../ui/button"
import { goToTop, isClickedButton } from "./pagination.func"
import { CURRENT_PAGE } from "@/constants"
import type { ArrowIconPT, OnClickNumBtnFT } from "./pagination.type"

export const PageNationBtn = () => {
  const { page, totalPage } = usePagination()
  const { changeParamValue } = useHandleUrlParams()
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
    if (page <= 1) return
    changeParamValue({ urlKey: CURRENT_PAGE, value: `${page - 1}` })
    goToTop()
  }
  const onClickNextBtn = () => {
    if (page + 1 > totalPage) return
    changeParamValue({ urlKey: CURRENT_PAGE, value: `${page + 1}` })
    goToTop()
  }

  return (
    <div className="flex max-w-[35rem] items-center gap-[1px] px-2 py-3 ">
      <ArrowIcon icon={ChevronsLeft} clickCallback={onClickStartBtn} />
      <ArrowIcon icon={ChevronLeft} clickCallback={onClickPrevBtn} />
      <PagiNationButtons />
      <ArrowIcon icon={ChevronRight} clickCallback={onClickNextBtn} />
      <ArrowIcon icon={ChevronsRight} clickCallback={onClickEndBtn} />
    </div>
  )
}

const ArrowIcon = ({ icon: Icon, clickCallback }: ArrowIconPT) => {
  return <Icon onClick={clickCallback} size={"30px"} />
}

const PagiNationButtons = () => {
  const { page, buttonLength, startNum } = usePagination()
  const { changeParamValue } = useHandleUrlParams()
  const onClickNumBtn: OnClickNumBtnFT = ({ buttonNumber }) => {
    if (page !== buttonNumber) {
      changeParamValue({ urlKey: CURRENT_PAGE, value: `${buttonNumber}` })
      goToTop()
    }
  }
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
