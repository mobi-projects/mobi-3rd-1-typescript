import { SORT_PAGE } from "@/constants/url-keys"
import { useDropDown } from "./dropdown.hooks"
import type { FC } from "react"
import type {
  DropdownItemProps,
  DropdownProps,
  DropdownTriggerProps,
} from "./dropdown.types"

export const Dropdown: FC<DropdownProps> = ({ items, option }) => {
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
      className="relative w-[10rem] cursor-pointer"
      onBlur={onClickWrapper}
      ref={boxRef}
    >
      <DropDownTrigger
        isOpen={isOpen}
        clickCallback={onClickTrigger}
        selectedOption={urlParams.get(SORT_PAGE)}
      />
      {isOpen && (
        <DropdownItems
          items={items}
          clickCallback={onClickItems}
          option={option}
        />
      )}
    </div>
  )
}

const DropdownItems: FC<DropdownItemProps> = ({
  clickCallback,
  items,
  option,
}) => {
  return (
    <div className="absolute top-16 h-fit w-full rounded-3xl border-2 bg-red-500/40 ">
      {items.map((item, idx) => (
        <div
          className="flex h-fit w-full items-center justify-center rounded-2xl py-2 text-white hover:bg-red-500/70"
          key={idx}
          onMouseDown={() => {
            clickCallback({ item: item, option: option })
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

const DropDownTrigger: FC<DropdownTriggerProps> = ({
  isOpen,
  selectedOption,
  clickCallback,
}) => {
  const Arrow = isOpen ? "🔼" : "🔽"
  const chosenValue = selectedOption ? selectedOption : "select"
  return (
    <button
      className="relative flex w-full items-center justify-center rounded-3xl border-2 bg-red-500/60 py-4 text-white"
      onClick={() => clickCallback()}
    >
      <h4 className="mw-[80%]">{chosenValue}</h4>
      <div className="absolute right-7 ">{Arrow}</div>
    </button>
  )
}
