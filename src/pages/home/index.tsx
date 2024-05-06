import { PageNationBtn } from "@/components"
import { usePagination } from "@/components/pagination/pagination.hook"
import { BOOK_LIST_TOT } from "./home.constant"
import { useBookList } from "./home.hook"
import { Header } from "@/components/header"

export const Home = () => {
  const { page } = usePagination({ totalPageLength: BOOK_LIST_TOT })
  const { data } = useBookList({ page: page })
  console.log(page)
  console.log(data)
  return (
    <div>
      <Header />
      <ul>
        {data?.item.map((book) => (
          <li key={book.isbn13}>
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
        ))}
      </ul>

      <PageNationBtn />
    </div>
  )
}
