import { DeferableImg } from "@/components"
import { useParams } from "react-router-dom"
import { bookDetailExtractor } from "./detail.func"
import { useBookDetail } from "./detail.hook"

export const Detail = () => {
  const { bookId } = useParams()
  const { data, isLoading } = useBookDetail({ isbn13: bookId as string })

  if (isLoading) {
    return <div>잠시만 기다려주세요...</div>
  }

  const bookDetail = bookDetailExtractor({ responseData: data })

  return (
    <div>
      <DeferableImg
        src={bookDetail.cover}
        size="big"
        radius="small"
        radio="portrait"
      />
      <p>------------------------------------------</p>
      <p>
        <strong>[책 정보]</strong>
      </p>
      <h1>
        <strong>제목</strong>: {bookDetail.title}
      </h1>
      <h2>
        <strong>작가 | 출판사</strong>: {bookDetail.author} |
        {bookDetail.publisher}
      </h2>
      <h3>
        <strong>정가</strong>: {bookDetail.priceStandard} 원
      </h3>

      <p>
        <strong>알라딘에서 구매하기 👉</strong> : {bookDetail.link}
      </p>
      <p>&nbsp;</p>
      <p>------------------------------------------</p>
      <p>
        <strong>[기타]</strong>
      </p>
      <h4>요약: {bookDetail.description}</h4>
      <h4>페이지수: {bookDetail.subInfo.itemPage} 쪽</h4>
    </div>
  )
}
