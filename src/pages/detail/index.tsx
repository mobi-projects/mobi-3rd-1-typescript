import { DeferableImg } from "@/components"
import { useParams } from "react-router-dom"
import { isBookDetail } from "./detail.func"
import { useBookDetail } from "./detail.hook"

export const Detail = () => {
  const { bookId } = useParams()
  const { data, isLoading } = useBookDetail({ isbn13: bookId as string })

  console.log(data)

  if (isLoading) return <div>잠시만 기다려주세요...</div>
  if (!isBookDetail(data)) return <div>데이터가 없습니다.</div>

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
    </div>
  )
}
