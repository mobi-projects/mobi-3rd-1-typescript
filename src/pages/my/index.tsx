import { DeferableImg } from "@/components"
import { useDialog } from "@/components/dialog/dialog.hook"
import { Header } from "@/components/header"
import { useFetchingUserInfo } from "./my.hook"
import { UpadateUserInfoModal } from "./my.modal"

/**
 * @notice
 * - 유저정보의 데이터가없다면? 기본값을 보여줘라 라는 코드를 작성해두었는데 임시로 작성해둔것입니다. 수정해야함
 */
export const My = () => {
  const { onModal } = useDialog()
  const { data, isLoading } = useFetchingUserInfo()
  const onClickConfirm = () => {
    // 확인누르면 실행할 로직작성
    console.log("실행")
  }
  if (isLoading) return <h1>Loading중....</h1>
  return (
    <div className=" h-full  w-full ">
      <Header />
      <div className="h-full w-[40rem]">
        <DeferableImg
          src={data?.profileUrl || "https://source.unsplash.com/random/?man"}
        />
        <p className="h-[3rem] w-fit bg-green-300">
          {data?.data.nickName || "닉네임입력좀"}
        </p>
        <p className="h-[3rem]  bg-blue-300">
          {data?.data.location || "주소입력좀"}
        </p>
        <p className="h-[3rem]  bg-slate-300">{data?.userId || "loginId"}</p>
      </div>
      <button
        onClick={() =>
          onModal({
            onConfirm: onClickConfirm,
            children: <UpadateUserInfoModal />,
          })
        }
        className="h-fit w-fit rounded-3xl bg-slate-200 p-4 hover:bg-slate-400"
      >
        정보 수정하기
      </button>
    </div>
  )
}
