import { BOOK_LIST_PER_PAGE } from "./home.constant"

export const HomeSuspenseFallback = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-dvw flex-col items-center justify-center IPAD_PRO:w-[75rem] ">
        <LoadingNotice />
        <div className="flex h-fit w-full flex-col justify-center gap-4 px-2 IPAD_PRO:flex-row IPAD_PRO:flex-wrap ">
          {Array.from({ length: BOOK_LIST_PER_PAGE }).map((_, idx) => (
            <FallbackCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}

const LoadingNotice = () => (
  <h1 className="h-fit py-5 text-xl font-extrabold text-gray-400 underline  decoration-1 underline-offset-8 IPHON_XR:w-[20rem] SF_DUO:text-lg">
    📚 도서 목록을 불러오고 있습니다..
  </h1>
)

const FallbackCard = () => (
  <div className="flex h-[15rem] w-full  max-w-[35rem] animate-pulse rounded-md border-2 border-x-2 bg-slate-400 drop-shadow-2xl" />
)
