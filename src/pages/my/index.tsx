import { useDialog } from "@/components/dialog/dialog.hook"
import { QUERY_KEY_USER } from "@/constants"
import { useUser } from "@/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useMutateUpdateProfile } from "./my.hook"
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
    <div className=" h-full  w-full ">
      <div className="h-full w-full">
        <div className="bg-slate-300">
          <div className="relative h-36 w-36  cursor-pointer rounded-full ">
            <img
              src={
                user?.profileUrl || "https://source.unsplash.com/random/?man"
              }
              className="absolute h-36 w-36 rounded-full"
            />
            <input
              onChange={onChangeProfileImage}
              type="file"
              accept="image/*"
              className=" peer absolute z-20 flex h-36 w-36 items-center justify-center rounded-full opacity-0 "
            />
            <div className="absolute flex h-36 w-36 items-center justify-center  rounded-full bg-red-300 font-bold opacity-0 peer-hover:opacity-70">
              프로필 등록!
            </div>
          </div>
        </div>
        <p className="h-[3rem] w-fit bg-green-300">
          {user?.nickname || "닉네임입력좀"}
        </p>
        <p className="h-[3rem]  bg-slate-300">{user?.email}</p>
      </div>
      <button
        onClick={() =>
          onModal({
            onConfirm: onClickConfirm,
            // children: <UpadateUserInfoModal />,
          })
        }
        className="h-fit w-fit rounded-3xl bg-slate-200 p-4 hover:bg-slate-400"
      >
        정보 수정하기
      </button>
    </div>
  )
}
