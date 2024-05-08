import { DeferableImg } from "@/components"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { isBookDetail } from "./detail.func"
import { useBookDetail, useMutateReview } from "./detail.hook"
import type { ReviewFormType, ReviewType } from "./detail.type"

export const Detail = () => {
  const { bookId } = useParams()
  const { data, isLoading } = useBookDetail({ isbn13: bookId as string })
  const { register, handleSubmit } = useForm<ReviewFormType>()
  const { mutate } = useMutateReview()

  if (isLoading) return <div>잠시만 기다려주세요...</div>
  if (!isBookDetail(data)) return <div>데이터가 없습니다.</div>

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
    <div>
      <DeferableImg
        src={data.cover}
        size="big"
        radius="small"
        radio="portrait"
      />
      <p>------------------------------------------</p>
      <p>
        <strong>[책 정보]</strong>
      </p>
      <h1>
        <strong>제목</strong>: {data.title}
      </h1>
      <h2>
        <strong>작가 | 출판사</strong>: {data.author} |{data.publisher}
      </h2>
      <h3>
        <strong>정가</strong>: {data.priceStandard} 원
      </h3>

      <p>
        <strong>알라딘에서 구매하기 👉</strong> : {data.link}
      </p>
      <p>&nbsp;</p>
      <p>------------------------------------------</p>
      <p>
        <strong>[기타]</strong>
      </p>
      <h4>요약: {data.description}</h4>
      <h4>페이지수: {data.subInfo.itemPage} 쪽</h4>

      <p>===========================================</p>

      <strong>리뷰 참여</strong>

      <form onSubmit={handleSubmit(onSubmitReview)}>
        <div>
          <label>후기 작성 👉</label>
          <textarea
            className="h-52 w-52 resize-none border-2 border-solid border-black"
            {...register("comment")}
          />
        </div>

        <div>
          <label>평점 👉</label>
          <input
            {...register("rating")}
            className="border-2 border-solid border-black"
            type="number"
            max={10}
            min={0}
          />
        </div>

        <button className="border-2 border-solid border-black">제출하기</button>
      </form>
    </div>
  )
}
