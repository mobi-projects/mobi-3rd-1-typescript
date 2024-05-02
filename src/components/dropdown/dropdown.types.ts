type Option = "perPage" | string // sort에사용될 키값들을 추가해주세요 sort옵션이 다정해지고나면 string은삭제 합니다.

export type DropdownProps = {
  items: Array<string>
  option: Option
}

export type ClickCallbackFunc = (input: {
  item: string
  option: Option
}) => void

export type DropdownItemsProps = {
  clickCallback: ClickCallbackFunc
  items: Array<string>
  option: Option
}

export type DropdownTriggerProps = {
  isOpen: boolean
  selectedOption: string | null
  clickCallback: () => void
}

export type GetUrlkeyByOptionFunc = (input: { option: Option }) => string
