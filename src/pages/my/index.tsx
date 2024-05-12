import { useUser } from "@/hooks"
import { Header, Info, ProfileImage } from "./components"
import { isUndefined } from "@/funcs"

/**
 * @notice
 * - 유저정보의 데이터가없다면? 기본값을 보여줘라 라는 코드를 작성해두었는데 임시로 작성해둔것입니다. 수정해야함
 */
export const My = () => {
  const { user, isLoading } = useUser()
  if (isLoading) return <h1>Loading중....</h1>
  if (isUndefined(user)) return <h1>오류가생겼어요..</h1>
  return (
    <div className=" flex  h-full w-full items-center justify-center">
      <div className=" flex  w-full flex-col items-center justify-center px-2 IPAD_PRO:w-[50rem] ">
        <Header />
        <div className="flex h-full w-full flex-col pt-5 IPAD_PRO:flex-row ">
          <ProfileImage {...user} />
          <Info {...user} />
        </div>
      </div>
    </div>
  )
}
