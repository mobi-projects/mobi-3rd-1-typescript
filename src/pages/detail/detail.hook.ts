import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { BOOK_DETAIL_GC_TIME, BOOK_DETAIL_STALE_TIME } from "./detail.constant"
import { getBookDetail } from "./detail.func"
import type { BookDetailResponseType } from "./detail.type"

export type UseBookDetailFT = (input: {
  isbn13: string
}) => UseQueryResult<BookDetailResponseType, Error>

export const useBookDetail: UseBookDetailFT = ({ isbn13 }) => {
  return useQuery({
    queryKey: ["book-detail", isbn13],
    queryFn: () => getBookDetail({ isbn13 }),
    staleTime: BOOK_DETAIL_STALE_TIME,
    gcTime: BOOK_DETAIL_GC_TIME,
  })
}
