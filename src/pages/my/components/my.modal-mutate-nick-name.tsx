import { Input } from "@/components/ui/input"
import { useMutateUpdateUser, useSubmitUpdateData } from "../my.hook"
import type { UpdateUserFormType } from "../my.type"

export const MutateNickName = () => {
  const { updateUser } = useMutateUpdateUser()
  const { register, handleSubmit } = useSubmitUpdateData()
  const onSubmitUpdateData = (data: UpdateUserFormType) => {
    updateUser(data)
  }
  return (
    <form
      className="flex flex-col items-center pt-10"
      onSubmit={handleSubmit(onSubmitUpdateData)}
    >
      <h1 className="pb-10 text-2xl font-bold text-slate-700">
        닉네임을 입력해 주세요
      </h1>
      <Input
        className="border-2 border-slate-600"
        autoComplete="off"
        placeholder="new nickname"
        {...register("nickname")}
      />
      <button
        className="absolute bottom-0 left-1/2 h-14 w-1/2 bg-transparent"
        type="submit"
      />
    </form>
  )
}
