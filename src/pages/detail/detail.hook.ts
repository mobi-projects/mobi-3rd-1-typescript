import { useDialog } from "@/components/dialog/dialog.hook"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { BOOK_DETAIL_GC_TIME, BOOK_DETAIL_STALE_TIME } from "./detail.constant"
import { getBookDetail, postReviewOnPeanut } from "./detail.func"
import type { BookDetailType, ReviewFormType, ReviewType } from "./detail.type"
import { reviewSchema } from "./detail.yup-schema"

export const useReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReviewFormType>({
    mode: "onChange",
    resolver: yupResolver(reviewSchema),
  })
  return { register, handleSubmit, errors, isValid }
}

export const useBookDetail = ({ isbn13 }: { isbn13: string }) => {
  const { data: bookDetail, ...rest } = useQuery({
    queryKey: ["book-detail", isbn13],
    queryFn: () => getBookDetail({ isbn13 }),
    staleTime: BOOK_DETAIL_STALE_TIME,
    gcTime: BOOK_DETAIL_GC_TIME,
  })
  return { bookDetail, ...rest }
}

export const useMutateReview = () => {
  const queryClient = useQueryClient()
  const { onAlert } = useDialog()
  const { mutate: leaveReview, ...rest } = useMutation({
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
    onError: (error) => onAlert({ children: error.message }),
  })
  return { leaveReview, ...rest }
}
