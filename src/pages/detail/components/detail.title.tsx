import type { BookDetailType } from "../detail.type"

export const DetailTitle = ({ title, subInfo }: BookDetailType) => {
  return (
    <div className="flex h-fit w-full items-center overflow-hidden border-b-2 py-5 IPHON_XR:py-2 ">
      <h2 className="flex  text-xl font-bold">{title}</h2>
      <p className="flex items-center pl-2 pt-1 text-slate-500 IPHON_XR:hidden">
        {subInfo.subTitle}
      </p>
    </div>
  )
}
