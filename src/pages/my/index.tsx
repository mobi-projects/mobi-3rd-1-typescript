import {
  useFetchingUserInfo,
  useMutateUserInfo,
  useSubmitUpdateData,
  useUpdateUserImage,
} from "./my.hook"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UpdataDataType } from "./my.type"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "@/components"
import { Input } from "@/components/ui/input"

/**
 * @notice
 * - 유저정보의 데이터가없다면? 기본값을 보여줘라 라는 코드를 작성해두었는데 임시로 작성해둔것입니다. 수정해야함
 */
export const My = () => {
  const { data, isLoading } = useFetchingUserInfo()
  const { mutate: imgMutate } = useUpdateUserImage()
  const { mutate: nameMutate } = useMutateUserInfo()
  const { register, handleSubmit, reset } = useSubmitUpdateData()
  const onSubmitUpdateData = (data: UpdataDataType) => {
    nameMutate(data)
    reset()
  }
  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.currentTarget.files) {
      formData.append("image", e.currentTarget.files[0])
      imgMutate(formData)
    }
  }

  if (isLoading) return <h1>Loading중....</h1>

  return (
    <div className=" h-full  w-full ">
      <div className="h-full w-full">
        <div className="bg-slate-300">
          <div className="relative h-36 w-36  cursor-pointer rounded-full ">
            <img
              src={
                data?.profileUrl || "https://source.unsplash.com/random/?man"
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
          {data?.data.nickName || "닉네임입력좀"}
          {/* 이부분을 데이터를 받는걸로 하고 주는부분에서 alert로 막는게 좋지않을까요 ?? 그리고 닉네임 중복도 막아야 할거같아서 같이 막는김에 useSuspend */}
        </p>
        <p className="h-[3rem]  bg-slate-300">{data?.userId}</p>
      </div>
      <Dialog>
        <DialogTrigger className="h-fit w-fit rounded-3xl bg-slate-200 p-4 hover:bg-slate-400">
          Open
        </DialogTrigger>
        <DialogContent className="w-[20rem] rounded-3xl">
          <DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmitUpdateData)}
              className="flex h-[10rem]  flex-col items-center gap-3 "
            >
              <h3 className="py-5 font-bold">New Nick Name</h3>
              <div>
                <Input
                  className="border-2"
                  placeholder={data?.data.nickName || "닉네임입력좀"}
                  {...register("nickName")}
                />
              </div>
              <DialogClose>
                <Button
                  type="submit"
                  className="boreder-2 w-[10rem] rounded-full bg-blue-400 p-3 hover:bg-blue-50"
                  // disabled={!isValid} //스키마 정의 후 사용 예정
                >
                  Apply
                </Button>
              </DialogClose>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// 지금모달까지가려면
