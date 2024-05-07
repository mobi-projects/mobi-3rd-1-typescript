import { PageNationBtn } from "@/components"
import { Header } from "@/components/header"
import { usePagination } from "@/components/pagination/pagination.hook"
import { PATH_DETAIL } from "@/constants"
import { useNavigate } from "react-router-dom"
import { BOOK_LIST_TOT } from "./home.constant"
import { useBookList } from "./home.hook"

export const Home = () => {
  const { page } = usePagination({ totalPageLength: BOOK_LIST_TOT })
  const { data } = useBookList({ page })
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <ul>
        {data?.item.map((book) => {
          if (!!!book.isbn13) {
            return <CantFoundISBN13 key={book.itemId} />
          }
          return (
            <li
              key={book.isbn13}
              onClick={() => {
                navigate(PATH_DETAIL + "/" + book.isbn13)
              }}
            >
              <section>
                <div>
                  <strong>책 이름: </strong>
                  {book.title}
                </div>
                <div>
                  <strong>책 설명: </strong>
                  {book.description}
                </div>
                <div>
                  <strong>가격: </strong>
                  {book.priceSales}
                </div>
                <div>
                  <strong>평점: </strong>
                  {book.customerReviewRank}
                </div>
              </section>
              <div>=========================</div>
            </li>
          )
        })}
      </ul>

      <PageNationBtn />
    </div>
  )
}

const CantFoundISBN13 = () => {
  return (
    <li>
      <section>
        <div>
          <strong>🖥️ 광고제목</strong>
        </div>
        <div>
          <strong>🔥 광고설명</strong>
        </div>
        <div>
          <strong>광고ㅋㅋ</strong>
        </div>
      </section>
      <div>=========================</div>
    </li>
  )
}
