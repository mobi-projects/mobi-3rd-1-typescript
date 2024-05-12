import { Button } from "@/components/ui/button"
import { Hand } from "lucide-react"
import { BookDetailType } from "../detail.type"
import { addCommasToAmount } from "@/funcs/calculate"
import { getDiscountRate } from "../detail.func"

export const DetailContent = (data: BookDetailType) => {
  const salePriceWithCommas = addCommasToAmount({ amount: data.priceSales })
  const standardPriceWithCommas = addCommasToAmount({
    amount: data.priceStandard,
  })
  const discountRate = getDiscountRate({
    sale: data.priceSales,
    standard: data.priceStandard,
  })
  return (
    <div className=" relative flex h-full w-full flex-col items-center pt-4 IPAD_PRO:flex-row IPAD_PRO:items-start ">
      <img
        src={data.cover}
        className="max-w-[20rem] border-2 drop-shadow-2xl SF_DUO:h-[20rem] IPAD_PRO:h-[30rem]"
      />
      <div className="flex max-h-[30rem] w-full flex-col gap-4 pl-0 IPAD_PRO:w-[40rem] IPAD_PRO:items-start IPAD_PRO:pl-6">
        <h2 className="  w-full border-b-2 py-2 pl-4 text-lg font-semibold text-slate-700">
          책 정보
        </h2>
        <div className="flex items-center">
          <p className="w-[6rem] font-semibold ">판매가</p>
          <div className="flex h-fit w-[17rem] items-center break-keep SF_DUO:w-[20rem] IPAD_PRO:w-[20rem]">
            <p className="text-slate-700">{salePriceWithCommas}원</p>
            <p className="pl-2 pr-1 text-sm text-slate-500 line-through">{`(정가${standardPriceWithCommas}원)`}</p>
            <p className="text-sm">{`${discountRate}%sale중`}</p>
          </div>
        </div>
        <div className="flex">
          <p className="w-[6rem] font-semibold ">작가</p>
          <p className="h-fit w-[17rem] break-keep SF_DUO:w-[20rem] IPAD_PRO:w-[20rem]">
            {data.author}
          </p>
        </div>
        <div className="flex">
          <p className="w-[6rem] font-semibold ">출판사</p>
          <p className="h-fit w-[17rem] break-keep SF_DUO:w-[20rem] IPAD_PRO:w-[20rem]">
            {data.publisher}
          </p>
        </div>
        <div className="flex">
          <p className="w-[6rem] font-semibold ">책 소개</p>
          <p className="h-fit w-[17rem] break-keep SF_DUO:w-[20rem] SF_DUO:pb-10 IPAD_PRO:w-[20rem] ">
            {data.description}
          </p>
        </div>
        <div className="flex w-full justify-end ">
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
