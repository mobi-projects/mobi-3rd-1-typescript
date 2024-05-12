import type { BookItemType } from "@/types"

export type BookListResponseType = {
  item: Array<BookItemType>
  itemsPerPage: number
  startIndex: number
  totalResults: number
}
export type GetBookListFT = (input: {
  page: number
}) => Promise<BookListResponseType>

export type CardPropsType = {
  data: BookItemType
}
