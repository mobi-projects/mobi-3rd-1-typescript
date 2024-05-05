import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  BOOK_LIST_CACHING_KEY,
  BOOK_LIST_GC_TIME,
  BOOK_LIST_STALE_TIME,
} from "./home.constant"
import { getBookList } from "./home.func"
import type { BookListResponseType, UseBookListFT } from "./home.type"

export const useBookList: UseBookListFT = ({ page = 1 }) => {
  return useQuery<BookListResponseType>({
    queryKey: [BOOK_LIST_CACHING_KEY, { page }],
    queryFn: () => getBookList({ page }),
    placeholderData: keepPreviousData,
    staleTime: BOOK_LIST_STALE_TIME,
    gcTime: BOOK_LIST_GC_TIME,
  })
}
