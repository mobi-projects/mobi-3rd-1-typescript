import { API_UPDATE_USER_INFO } from "@/constants/server-endpoint"
import { baseAxiosInstance } from "@/libs/axios"
import { useQuery } from "@tanstack/react-query"
import { postUserSignOut } from "../sign-in/sign-in.func"
import { useNavigate } from "react-router-dom"
import { PATH_MY } from "@/constants"
import { DeferableImg } from "@/components"

export const My = () => {
  const navi = useNavigate()
  type UserDataType = {
    data: Record<"nickName" | "location", string>
    profileUrl: string | null
    userId: string
  }
  type PatchUserInfoFT = () => Promise<UserDataType>

  const patchUserInfo: PatchUserInfoFT = async () => {
    try {
      const response = await baseAxiosInstance.patch(API_UPDATE_USER_INFO)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
  const { data, isLoading } = useQuery<UserDataType>({
    queryKey: ["userInfo"],
    queryFn: () => patchUserInfo(),
  })
  if (isLoading) return <h1>Loading중....</h1>
  console.log(data)

  return (
    <div className=" h-full  w-full ">
      <div className="flex h-[8rem] w-[40rem] items-center justify-between bg-green-300">
        <h1>임시 헤더입니다. 로그아웃기능을 위해 배치했습니다.</h1>
        <button
          onClick={async () => await postUserSignOut()}
          className="rounded-3xl border-2 border-black bg-blue-600 p-3"
        >
          Logout
        </button>
        <button
          onClick={() => {
            navi(PATH_MY)
          }}
          className="rounded-3xl border-2 border-black bg-blue-600 p-3"
        >
          go mypage
        </button>
      </div>
      <div className="h-full w-[40rem]">
        <DeferableImg
          src={data?.profileUrl || "https://source.unsplash.com/random/?man"}
        />
        <span className="bg-green-300">
          {data?.data.nickName || "닉네임입력좀"}
        </span>
        <span className="bg-blue-300">
          {data?.data.location || "주소입력좀"}
        </span>
        <span className="bg-slate-300">{data?.userId || "loginId"}</span>
      </div>
    </div>
  )
}
