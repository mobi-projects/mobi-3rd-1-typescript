import type { DetailPT } from "../detail.type"

export const DetailTitle = ({ data }: DetailPT) => {
  return (
    <div className="flex h-fit w-full items-center overflow-hidden border-b-2 py-5 IPHON_XR:py-2 ">
      <h2 className="flex  text-xl font-bold">{data.title}</h2>
      <p className="flex items-center pl-2 pt-1 text-slate-500 IPHON_XR:hidden">
        {data.subInfo.subTitle}
      </p>
    </div>
  )
}
