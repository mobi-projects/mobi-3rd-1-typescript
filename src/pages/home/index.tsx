import { postUserSignout } from "../sign-in/sign-in.func"

export const Home = () => {
  return (
    <div className="flex h-[8rem] w-[40rem] items-center justify-between bg-green-300">
      <h1>임시 헤더입니다. 로그아웃기능을 위해 배치했습니다.</h1>
      <button
        onClick={async () => await postUserSignout()}
        className="rounded-3xl border-2 border-black bg-blue-600 p-3"
      >
        Logout
      </button>
    </div>
  )
}
