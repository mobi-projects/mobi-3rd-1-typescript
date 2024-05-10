import { Button } from "@/components/ui/button"
import { Hand } from "lucide-react"
import { BookDetailType } from "../detail.type"

export const DetailContent = (data: BookDetailType) => {
  return (
    <div className=" flex h-[43rem] w-full pt-4 IPHON_XR:h-full IPHON_XR:flex-col IPHON_XR:items-center">
      <img
        src={data.cover}
        className="h-full border-2 drop-shadow-2xl IPHON_XR:h-[20rem]"
      />
      <div className="relative flex w-[40rem] flex-col gap-4 pl-6 IPHON_XR:w-full IPHON_XR:pl-0">
        <h2 className="w-full border-b-2 py-2 pl-4 text-lg font-semibold text-slate-700">
          책 정보
        </h2>
        <div className="flex items-center">
          <p className="w-[6rem] font-semibold ">판매가</p>
          <p className="text-slate-700">{data.priceSales}원</p>
          <p className="pl-2 pr-1 text-sm text-slate-500 line-through">{`(정가${data.priceStandard}원)`}</p>
          <p className="text-sm">33%sale중</p>
        </div>
        <div className="flex">
          <p className="w-[6rem] font-semibold ">작가</p>
          <p>{data.author}</p>
        </div>
        <div className="flex">
          <p className="w-[6rem] font-semibold ">출판사</p>
          <p>{data.publisher}</p>
        </div>
        <div className="flex ">
          <p className="w-[6rem] font-semibold ">책 소개</p>
          <p className="h-fit w-[17rem] break-keep">{data.description}</p>
        </div>
        <div className="flex w-full justify-end pr-5">
          <Button
            className="absolute bottom-0 right-0 IPHON_XR:static"
            onClick={() => window.open(data.link)}
          >
            <p>구매링크</p>
            <Hand className="cursor-pointer text-yellow-100" size={"15px"} />
          </Button>
        </div>
      </div>
    </div>
  )
}
