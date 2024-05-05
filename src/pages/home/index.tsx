import { PageNationBtn } from "@/components"
import { usePagination } from "@/components/pagination/pagination.hook"
import { postUserSignOut } from "../sign-in/sign-in.func"
import { BOOK_LIST_TOT } from "./home.constant"
import { useBookList } from "./home.hook"
import { useNavigate } from "react-router-dom"
import { PATH_MY } from "@/constants"

export const Home = () => {
  const navi = useNavigate()
  const { page } = usePagination({ totalPageLength: BOOK_LIST_TOT })
  const { data } = useBookList({ page: page })
  console.log(page)
  console.log(data)
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
        <button
          onClick={() => {
            navi(PATH_MY)
          }}
          className="rounded-3xl border-2 border-black bg-blue-600 p-3"
        >
          go mypage
        </button>
      </div>
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
