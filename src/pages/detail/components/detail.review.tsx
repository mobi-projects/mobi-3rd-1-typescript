import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMutateReview, useReviewForm } from "../detail.hook"

import { FORM_COMMENT, FORM_RATING } from "@/constants"
import { isUndefined } from "@/funcs"
import { useUser } from "@/hooks"
import { createReview } from "../detail.func"
import type { BookDetailType, ReviewFormType } from "../detail.type"

export const Review = ({
  bookId,
  ...data
}: BookDetailType & { bookId: string | undefined }) => {
  const { leaveReview } = useMutateReview()
  const { register, handleSubmit, errors, isValid } = useReviewForm()
  const { user } = useUser()
  const onSubmitReview = (reviewForm: ReviewFormType) => {
    if (isUndefined(user)) return
    const review = createReview({ user, reviewForm })
    leaveReview({ isbn13: bookId as string, bookDetail: data, review })
  }

  return (
    <form className="pt-5" onSubmit={handleSubmit(onSubmitReview)}>
      <h1 className="py-2 text-lg font-bold">후기 남기기</h1>
      <div className="w-full">
        <Textarea
          className="resize-none  border-2 border-slate-500 IPHON_XR:w-[21rem] SF_DUO:w-[25rem] IPAD_PRO:w-[45rem] "
          {...register(FORM_COMMENT)}
          placeholder="후기를 남겨주세요!"
        />
      </div>
      <div className="flex items-center py-3">
        <p className="pr-3">별점등록 : </p>
        <Input
          {...register(FORM_RATING)}
          className="flex h-8 w-[7rem] border-2 border-slate-500 pl-3 IPHON_XR:w-[5.5rem]"
          type="number"
          placeholder="별점등록"
          max={10}
          min={0}
        />
      </div>
      <Button className="border-2 border-solid" disabled={!isValid}>
        리뷰등록
      </Button>
    </form>
  )
}
