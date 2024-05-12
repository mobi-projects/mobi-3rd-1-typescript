import { useDialog } from "@/components/dialog/dialog.hook"
import { QUERY_KEY_USER } from "@/constants"
import { useUser } from "@/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useMutateUpdateProfile } from "./my.hook"
import { ImagePlus, PencilLine } from "lucide-react"
// import { UpadateUserInfoModal } from "./my.modal"

/**
 * @notice
 * - 유저정보의 데이터가없다면? 기본값을 보여줘라 라는 코드를 작성해두었는데 임시로 작성해둔것입니다. 수정해야함
 */
export const My = () => {
  const { onModal } = useDialog()
  const { user, isLoading } = useUser()
  const { updateProfile } = useMutateUpdateProfile()
  const queryClient = useQueryClient()

  const onClickConfirm = () => {
    // 확인누르면 실행할 로직작성
    console.log("실행")
  }
  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.currentTarget.files) {
      formData.append("image", e.currentTarget.files[0])
      updateProfile(formData)
    }
  }
  const data = queryClient.getQueryData([QUERY_KEY_USER])
  console.log(data)

  if (isLoading) return <h1>Loading중....</h1>
  return (
    <div className=" flex  h-full  w-full items-center justify-center">
      <div className=" flex h-[50rem] w-full flex-col items-center justify-center px-2 IPAD_PRO:w-[50rem] ">
        <header className=" flex h-fit w-full items-start  border-b-2 pb-5 pt-10  text-xl  font-bold ">
          My Page
        </header>
        <div className="  flex h-full  w-full  flex-row  gap-[5%] space-x-2 pt-10">
          <div
            id="imgWrapper"
            className=" flex h-[80%] w-[50%] items-center justify-center"
          >
            <div className=" flex h-full w-full  flex-col items-center  justify-center rounded-xl border-b border-solid border-black bg-slate-300">
              <p className=" flex h-full w-full justify-center  px-[5%] py-[5%]">
                <div className="relative h-[70%] w-full  cursor-pointer rounded-3xl ">
                  <img
                    src={
                      user?.profileUrl ||
                      "https://source.unsplash.com/random/?man"
                    }
                    className="absolute h-full w-full rounded-full"
                  />
                  <input
                    onChange={onChangeProfileImage}
                    type="file"
                    accept="image/*"
                    className=" peer absolute z-20 flex h-full w-full items-center justify-center rounded-full opacity-0 "
                  />
                  <div className="absolute flex h-full w-full items-center justify-center  rounded-full bg-slate-300 font-bold opacity-0 peer-hover:opacity-70">
                    <ImagePlus size={32} />
                  </div>
                </div>
              </p>
            </div>
          </div>

          <main className="flex h-full w-[50%] flex-col  items-stretch">
            <div
              id="infoWrapper"
              className="x-full flex h-[70%] flex-col items-center"
            >
              <div
                id="subTitle"
                className="font-bord flex h-[10%] w-full items-end border-b-2 pb-2 pl-[3%] text-xl"
              >
                나의 정보
              </div>
              <section className="flex w-full items-center pt-[10%] font-extralight">
                <h2 className=" w-[20%]  text-xl">Email(@)</h2>
                <h2 className="px-2">:</h2>
                <div className="  flex items-center text-xl font-medium ">
                  {user?.email}
                </div>
              </section>
              <section className="flex w-full justify-between pt-[10%]">
                <div className="flex w-full  items-center  font-extralight">
                  <h2 className=" w-[24%]  text-xl">Name</h2>
                  <h2 className="px-2">:</h2>
                  <p className="flex items-center text-xl font-medium">
                    {user?.nickname || "닉네임입력좀"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    onModal({
                      onConfirm: onClickConfirm,
                    })
                  }
                  className="h-fit w-fit rounded-full  p-4 hover:bg-slate-200"
                >
                  <PencilLine />
                </button>
              </section>
            </div>
            <div id="bookReferences x-full flex h-[10%] flex-col items-center">
              <div className="font-bord i flex w-full border-b-2 pb-2 pl-[3%] text-xl">
                책 정보 출처
              </div>
              <section className="flex w-full items-center  font-extralight">
                <h2 className=" w-fit  text-xl">알라딘</h2>
                <h2 className="px-2">:</h2>
                <div className="  text-md flex items-center font-thin ">
                  https://blog.aladin.co.kr/openapi/6695306
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
