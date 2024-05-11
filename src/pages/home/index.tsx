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
    <div className="flex w-full items-center justify-center">
      <div className="IPAD_PRO:w-[75rem] flex w-dvw flex-col items-center justify-center ">
        <h1 className="SF_DUO:text-lg h-fit py-5 text-xl font-extrabold text-slate-400  underline decoration-1 underline-offset-8 IPHON_XR:w-[20rem]">
          오늘의 독서, <strong className=" text-black ">Chaeg Check</strong>과
          함께하세요! 책 목록과 후기를 한눈에!
        </h1>
        <div className="IPAD_PRO:flex-wrap IPAD_PRO:flex-row flex h-fit w-full flex-col justify-center gap-4 px-2 ">
          {data?.item.map((book) => {
            if (!!!book.isbn13) {
              return <CantFoundISBN13 key={book.itemId} />
            }
            return (
              <Card
                key={book.isbn13}
                data={book}
                onClick={() => {
                  navigate(PATH_DETAIL + "/" + book.isbn13)
                }}
              />
            )
          })}
        </div>
        <PageNationBtn />
      </div>
    </div>
  )
}
