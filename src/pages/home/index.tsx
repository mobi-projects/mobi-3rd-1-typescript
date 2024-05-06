import { PageNationBtn } from "@/components"
import { usePagination } from "@/components/pagination/pagination.hook"
import { PATH_DETAIL } from "@/constants"
import { useNavigate } from "react-router-dom"
import { postUserSignOut } from "../sign-in/sign-in.func"
import { BOOK_LIST_TOT } from "./home.constant"
import { useBookList } from "./home.hook"

export const Home = () => {
  const { page } = usePagination({ totalPageLength: BOOK_LIST_TOT })
  const { data } = useBookList({ page })
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex h-[8rem] w-[40rem] items-center justify-between bg-green-300">
        <h1>임시 헤더입니다. 로그아웃기능을 위해 배치했습니다.</h1>
        <button
          onClick={async () => await postUserSignOut()}
          className="rounded-3xl border-2 border-black bg-blue-600 p-3"
        >
          Logout
        </button>
      </div>
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
