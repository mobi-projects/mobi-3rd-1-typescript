export type ChangeUrlFT = (input: Record<"urlKey" | "value", string>) => void

export type UsePaginationPT = { totalPageLength: number }

export type OnClickNumBtnFT = ({
  buttonNumber,
}: {
  buttonNumber: number
}) => void
