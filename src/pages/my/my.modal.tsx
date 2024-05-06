import { useMutateUserInfo, useSubmitUpdateData } from "./my.hook"

import type { UpdataDataType } from "./my.type"
/**
 * @description 수정할 정보를 보여주는 모달창 컴포넌트입니다.수정하기 버튼을 누르면 서버로 patch요청 전송
 * @notice  아직 schema를 정의하지않아서 유효성검사 추가되면 error, isValid추가하면 됩니다.
 */
export const UpadateUserInfoModal = () => {
  const { mutate } = useMutateUserInfo()
  const { register, handleSubmit } = useSubmitUpdateData()
  const onSubmitUpdateData = (data: UpdataDataType) => {
    mutate(data)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmitUpdateData)}
      className="flex h-[30rem] w-[30rem] flex-col items-center gap-3 bg-slate-100"
    >
      <h3 className="py-5 font-bold">정보수정 모달</h3>
      <div>
        <span className="text-sm">Password</span>
        <input className="border-2 border-blue-500" {...register("password")} />
      </div>
      <div>
        <span className="text-sm">NickName</span>
        <input className="border-2 border-blue-500" {...register("nickName")} />
      </div>
      <button
        type="submit"
        className="boreder-2 bg-blue-400 p-3 hover:bg-blue-500"
        // disabled={!isValid} //스키마 정의 후 사용 예정
      >
        수정하기
      </button>
    </form>
  )
}
