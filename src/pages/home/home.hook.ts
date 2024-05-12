import { useSuspenseQuery } from "@tanstack/react-query"
import {
  BOOK_LIST_CACHING_KEY,
  BOOK_LIST_GC_TIME,
  BOOK_LIST_STALE_TIME,
} from "./home.constant"
import { getBookList } from "./home.func"
import type { BookListResponseType } from "./home.type"

export const useBookList = ({ page = 1 }) =>
  useSuspenseQuery<BookListResponseType>({
    queryKey: [BOOK_LIST_CACHING_KEY, { page }],
    queryFn: () => getBookList({ page }),
    staleTime: BOOK_LIST_STALE_TIME,
    gcTime: BOOK_LIST_GC_TIME,
  })
