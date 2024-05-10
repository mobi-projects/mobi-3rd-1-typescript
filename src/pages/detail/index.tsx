import { useParams } from "react-router-dom"
import { isBookDetail } from "./detail.func"
import { useBookDetail } from "./detail.hook"
import { DetailContent, DetailTitle, Review } from "./components"

export const Detail = () => {
  const { bookId } = useParams()
  const { data, isLoading } = useBookDetail({ isbn13: bookId as string })

  if (isLoading) return <div>잠시만 기다려주세요...</div>
  if (!isBookDetail(data)) return <div>데이터가 없습니다.</div>

  return (
    <div className="flex w-full items-center justify-center px-2">
      <div className=" flex  w-full items-center justify-center px-2 IPAD_PRO:w-[50rem]">
        <div className="flex h-fit w-full flex-col items-start ">
          <DetailTitle {...data} />
          <DetailContent {...data} />
          <Review bookId={bookId} {...data} />
        </div>
      </div>
    </div>
  )
}
