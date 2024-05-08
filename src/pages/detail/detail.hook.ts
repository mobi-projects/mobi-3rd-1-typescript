import { useQuery } from "@tanstack/react-query"
import { BOOK_DETAIL_GC_TIME, BOOK_DETAIL_STALE_TIME } from "./detail.constant"
import { getBookDetail } from "./detail.func"

export const useBookDetail = ({ isbn13 }: { isbn13: string }) =>
  useQuery({
    queryKey: ["book-detail", isbn13],
    queryFn: () => getBookDetail({ isbn13 }),
    staleTime: BOOK_DETAIL_STALE_TIME,
    gcTime: BOOK_DETAIL_GC_TIME,
  })
