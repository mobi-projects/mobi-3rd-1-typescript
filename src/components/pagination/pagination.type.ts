type usePaginationReturnType = {
  page: number
  pagenationBtnLength: number
  totalPage: number
  changeUrl: ChangeUrlFT
}

export type ChangeUrlFT = (input: Record<"urlKey" | "value", string>) => void

export type usePaginationPorps = (input: {
  totalPageLength: number
}) => usePaginationReturnType

export type OnClickNumBtnFT = ({
  buttonNumber,
}: {
  buttonNumber: number
}) => void
