import type { BookItemType } from "@/types"
import type { UseQueryResult } from "@tanstack/react-query"

export type BookListResponseType = {
  item: Array<BookItemType>
  itemsPerPage: number
  startIndex: number
  totalResults: number
}
export type GetBookListFT = (input: {
  page: number
}) => Promise<BookListResponseType>

export type UseBookListFT = (input: {
  page: number
}) => UseQueryResult<BookListResponseType, Error>
