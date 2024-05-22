import { PageNationBtn } from "@/components"
import { usePaginationInfo } from "@/components/pagination/pagination.hook"
import { PATH_DETAIL } from "@/constants"
import { useNavigate } from "react-router-dom"
import { CantFoundISBN13, Card } from "./components"

import { useBookList } from "./home.hook"
export const Home = () => {
  const { page } = usePaginationInfo()
  const { data, isLoading } = useBookList({ page })
  const navigate = useNavigate()
  if (isLoading) return <h1>로딩중~~~~!</h1>
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-dvw flex-col items-center justify-center IPAD_PRO:w-[75rem] ">
        <h1 className="h-fit py-5 text-xl font-extrabold text-slate-400 underline  decoration-1 underline-offset-8 IPHON_XR:w-[20rem] SF_DUO:text-lg">
          오늘의 독서, <strong className=" text-black ">Chaeg Check</strong>과
          함께하세요! 책 목록과 후기를 한눈에!
        </h1>
        <div className="flex h-fit w-full flex-col justify-center gap-4 px-2 IPAD_PRO:flex-row IPAD_PRO:flex-wrap ">
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
