import { SORT_OPTION } from "@/constants/url-keys"
import { useDropDown } from "@/hooks/use-drop-down"
import { FC } from "react"

export type DropdownProps = { items: Array<string> }

export const Dropdown: FC<DropdownProps> = ({ items }) => {
  const {
    isOpen,
    boxRef,
    onClickWrapper,
    onClickTrigger,
    onClickItems,
    urlParams,
  } = useDropDown()

  return (
    <div
      className="relative w-[20rem] cursor-pointer"
      onBlur={onClickWrapper}
      ref={boxRef}
    >
      <DropDownTrigger
        isOpen={isOpen}
        clickCallback={onClickTrigger}
        selectedOption={urlParams.get(SORT_OPTION)}
      />
      {isOpen && <DropdownItems items={items} clickCallback={onClickItems} />}
    </div>
  )
}
//------------------------------------------------------------------------------------------
type DropdownItemProps = {
  clickCallback: ({ item }: { item: string }) => void
  items: Array<string>
}
const DropdownItems: FC<DropdownItemProps> = ({ clickCallback, items }) => {
  return (
    <div className="border-GSCALE-600 bg-THEME-RED/40 absolute top-24 h-fit w-full  rounded-3xl  border-2 ">
      {items.map((item, idx) => (
        <div
          className="text-MD text-GSCALE-0 hover:bg-THEME-RED/70 z-50 flex h-fit w-full items-center justify-center rounded-2xl py-2"
          key={idx}
          onMouseDown={() => {
            clickCallback({ item })
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
// -------------------------------------------------------------------------------------
type DropdownTriggerProps = {
  isOpen: boolean
  selectedOption: string | null
  clickCallback: () => void
}
const DropDownTrigger: FC<DropdownTriggerProps> = ({
  isOpen,
  selectedOption,
  clickCallback,
}) => {
  const Arrow = isOpen ? "U" : "D"
  return (
    <button
      className="border-GSCALE-600 bg-THEME-RED/60 text-GSCALE-0 relative flex w-full items-center justify-center rounded-3xl border-2 border-solid py-4"
      onClick={() => clickCallback()}
    >
      <h4 className="mw-[80%] overflow-hidden ">
        {selectedOption ? selectedOption : "select option"}{" "}
        {/*옵션선택된게 없으면 select option 이 default로*/}
      </h4>
      <div className="absolute right-7 ">{Arrow}</div>
    </button>
  )
}
