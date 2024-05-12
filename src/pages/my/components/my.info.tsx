import { useDialog } from "@/components/dialog/dialog.hook"
import { PencilLine } from "lucide-react"
import { MutateNickName } from "./my.modal-mutate-nick-name"
import type { UserType } from "@/types"

export const Info = ({ email, nickname }: UserType) => {
  const { onModal } = useDialog()
  return (
    <main className="flex h-[29rem] w-full flex-col IPAD_PRO:pl-10">
      <div className=" flex h-[70%] flex-col items-center">
        <div className="flex w-full border-b-2 py-3 text-xl font-bold text-slate-600">
          나의 정보
        </div>
        <section className="flex w-full items-center pt-10 font-extralight">
          <h2 className="w-[6rem]  text-xl font-semibold">Email(@)</h2>
          <h2 className="px-2">:</h2>
          <div className=" flex items-center text-lg font-medium ">{email}</div>
        </section>
        <div className="flex w-full  items-center  pt-10 font-extralight">
          <h2 className="w-[6rem]  text-xl font-semibold">Name</h2>
          <h2 className="px-2">:</h2>
          <p className="flex items-center text-lg font-medium">{nickname}</p>
          <PencilLine
            onClick={() =>
              onModal({
                children: <MutateNickName />,
              })
            }
            className="h-fit w-fit rounded-full p-1 hover:scale-110 hover:bg-slate-200"
            size={"30px"}
          />
        </div>
      </div>
      <Reference />
    </main>
  )
}

const Reference = () => {
  return (
    <div className="flex h-fit flex-col items-center gap-2 py-4">
      <div className="flex w-full border-b-2 pb-2 pl-[3%] text-xl font-bold text-slate-600">
        책 정보 출처
      </div>
      <section className="flex w-full flex-col pl-2">
        <h2 className=" w-[10rem] text-lg">알라딘</h2>
        <p className="text-md flex items-center font-thin underline">
          https://blog.aladin.co.kr/openapi/6695306
        </p>
      </section>
    </div>
  )
}
