type option = "perPage" | string // sort에사용될 키값들을 추가해주세요

export type DropdownProps = {
  items: Array<string>
  option: option
}

export type ClickItemFuncProps = {
  ({ item, option }: { item: string; option: option }): void
}

export type DropdownItemProps = {
  clickCallback: ClickItemFuncProps
  items: Array<string>
  option: option
}

export type DropdownTriggerProps = {
  isOpen: boolean
  selectedOption: string | null
  clickCallback: () => void
}

export type GetKeyFuncProps = {
  ({ option }: { option: option }): string
}
