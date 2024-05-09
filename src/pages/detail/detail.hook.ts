import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BOOK_DETAIL_GC_TIME, BOOK_DETAIL_STALE_TIME } from "./detail.constant"
import { getBookDetail, postReviewOnPeanut } from "./detail.func"
import type { BookDetailType, ReviewType } from "./detail.type"

export const useBookDetail = ({ isbn13 }: { isbn13: string }) =>
  useQuery({
    queryKey: ["book-detail", isbn13],
    queryFn: () => getBookDetail({ isbn13 }),
    staleTime: BOOK_DETAIL_STALE_TIME,
    gcTime: BOOK_DETAIL_GC_TIME,
  })

export const useMutateReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["post-review"],
    mutationFn: ({
      isbn13,
      bookDetail,
      review,
    }: {
      isbn13: string
      bookDetail: BookDetailType
      review: ReviewType
    }) => postReviewOnPeanut({ isbn13, bookDetail, review }),
    onSuccess: (data, variables) => {
      const isbn13 = variables.isbn13
      queryClient.setQueryData(["book-detail", isbn13], { ...data })
    },
  })
}
