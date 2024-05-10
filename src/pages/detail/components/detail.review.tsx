import { useForm } from "react-hook-form"
import { useMutateReview } from "../detail.hook"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import type { BookDetailType, ReviewFormType, ReviewType } from "../detail.type"

export const Review = ({
  bookId,
  ...data
}: BookDetailType & { bookId: string | undefined }) => {
  const { register, handleSubmit } = useForm<ReviewFormType>()
  const { mutate } = useMutateReview()
  const onSubmitReview = (reviewFormData: ReviewFormType) => {
    /**
     * @note
     * 👇 아래 `review` 는 임의로 생성한 Review 객체입니다.
     *   User 객체를 가져오면, `email`, `nickname`, `profileUrl` 값을 채워야 합니다.
     */
    const review: ReviewType = {
      email: "test@email.com",
      nickname: "testNickname",
      profileUrl: "testProfile",
      comment: reviewFormData.comment,
      rating: reviewFormData.rating,
    }
    mutate({ isbn13: bookId as string, bookDetail: data, review })
  }

  return (
    <form className="pt-5" onSubmit={handleSubmit(onSubmitReview)}>
      <h1 className="py-2 text-lg font-bold">후기 남기기</h1>
      <div className="w-full">
        <Textarea
          className="resize-none  border-2 border-slate-500 IPHON_XR:w-[21rem] IPAD_PRO:w-[45rem] "
          {...register("comment")}
          placeholder="후기를 남겨주세요!"
        />
      </div>
      <div className="flex items-center py-3">
        <p className="pr-3">별점등록 : </p>
        <Input
          {...register("rating")}
          className="flex h-8 w-[7rem] border-2 border-slate-500 pl-3 IPHON_XR:w-[5.5rem]"
          type="number"
          placeholder="별점등록"
          max={10}
          min={0}
        />
      </div>
      <Button className="border-2 border-solid">리뷰등록</Button>
    </form>
  )
}
