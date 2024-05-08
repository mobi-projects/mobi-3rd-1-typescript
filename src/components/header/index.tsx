import { PATH_MY, PATH_SIGN } from "@/constants"
import { postUserSignOut } from "@/pages/sign/sign.func"

import { useNavigate } from "react-router-dom"

export const Header = () => {
  const navi = useNavigate()
  return (
    <div className="flex h-[8rem] w-[40rem] items-center justify-between bg-green-300">
      <h1>임시 헤더입니다. 로그아웃기능을 위해 배치했습니다.</h1>
      <button
        onClick={async () => navi(PATH_SIGN)}
        className="rounded-3xl border-2 border-black bg-blue-600 p-3"
      >
        Home
      </button>
      <button
        onClick={async () => {
          const result = await postUserSignOut()
          if (result) return navi(PATH_SIGN)
        }}
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
  )
}
