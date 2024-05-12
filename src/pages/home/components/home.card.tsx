import { DollarSign } from "lucide-react"
import { HTMLAttributes } from "react"

import type { CardPropsType } from "../home.type"
import { addCommasToAmount } from "@/funcs/calculate"

export const Card = ({
  data,
  ...rest
}: CardPropsType & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...rest}
      className="flex h-[15rem]  w-full max-w-[35rem] cursor-pointer flex-col rounded-md border-2 border-x-2 border-slate-300 drop-shadow-2xl"
    >
      <CardTitle data={data} />
      <CardContent data={data} />
    </div>
  )
}

const CardTitle = ({ data }: CardPropsType) => {
  return (
    <div className="mt-[1px] flex h-fit w-full items-center justify-start border-b-2 p-1 text-black">
      <p className="truncate ">{data.title}</p>
    </div>
  )
}

const CardContent = ({ data }: CardPropsType) => {
  const priceWithCommas = addCommasToAmount({ amount: data.priceSales })
  const description = data.description
    ? data.description
    : "아쉽지만 설명이 아직 준비안됐어요."
  return (
    <div className="relative flex h-full w-full items-start pl-[2px] hover:bg-slate-50">
      <img src={data.cover} className="h-full max-h-[12.5rem] w-[10rem] " />
      <div className="h-full w-[60%] items-start pl-1">
        <p className="line-clamp-6 text-slate-500">{description}</p>
        <div className="absolute bottom-0 right-0 flex h-6 items-center  ">
          <DollarSign size="19px" className=" pt-[2px]" />
          <p className="h-full">{priceWithCommas}원</p>
        </div>
        <p className="absolute bottom-0 h-6 w-[16rem]  truncate text-slate-600 IPHON_XR:hidden">
          {data.author}
        </p>
      </div>
    </div>
  )
}

export const CantFoundISBN13 = () => {
  return (
    <div className="flex h-[15rem]  w-full max-w-[35rem] cursor-pointer flex-col rounded-md border-2 border-x-2 border-slate-300 bg-slate-300 drop-shadow-2xl" />
  )
}
