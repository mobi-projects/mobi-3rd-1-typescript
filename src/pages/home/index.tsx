import { PageNationBtn } from "@/components"
import { usePagination } from "@/components/pagination/pagination.hook"
import { PATH_DETAIL } from "@/constants"
import { useNavigate } from "react-router-dom"
import { BOOK_LIST_TOT } from "./home.constant"
import { useBookList } from "./home.hook"
import { CantFoundISBN13, Card } from "./components"

export const Home = () => {
  const { page } = usePagination({ totalPageLength: BOOK_LIST_TOT })
  const { data, isLoading } = useBookList({ page })
  const navigate = useNavigate()
  if (isLoading) return <h1>로딩중~~~~!</h1>

  return (
    <div className="flex w-full flex-col items-center justify-center IPHON_XR:w-full">
      <div className="flex h-full w-full flex-col gap-4 px-2 ">
        {data?.item.map((book) => {
          if (!!!book.isbn13) {
            return <CantFoundISBN13 key={book.itemId} />
          }
          return (
            <Card
              key={book.isbn13}
              data={book} // 여기서 data props를 book으로 전달합니다.
              onClick={() => {
                navigate(PATH_DETAIL + "/" + book.isbn13)
              }}
            />
          )
        })}
      </div>
      <PageNationBtn />
    </div>
  )
}
