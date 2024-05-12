import type { BookDetailType } from "../detail.type"

export const ReviewList = (data: BookDetailType) => {
  const reviewCount = data.reviews.length
  return (
    <div className=" mb-10 mt-5 w-full border-t-2 py-2">
      <h1 className="w-full py-2 text-lg font-semibold text-slate-700">
        {`${reviewCount} 개의 후기`}
      </h1>
      {reviewCount === 0 ? (
        <h1 className="flex w-full items-center justify-center py-2 font-bold">
          아직 리뷰가없어요! 소중한 리뷰를 달아주세요
        </h1>
      ) : (
        data.reviews.map((review, idx) => (
          <div
            className="flex w-full border-y-2 border-slate-100 py-2"
            key={idx}
          >
            <div className="flex items-start py-2">
              <img
                src={review.profileUrl}
                className="h-16 w-16 rounded-full "
              />
            </div>
            <div className="pl-2">
              <p className="pb-2 text-sm font-thin IPHON_XR:text-xs">
                {review.nickname}
              </p>
              <p className="IPHON_XR: text-sm">{review.comment}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
