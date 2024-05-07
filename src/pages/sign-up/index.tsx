import { useDialog } from "@/components/dialog/dialog.hook"
import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import { useForm } from "react-hook-form"
import { useMutationSignUp } from "./sign-up.hook"
import type { SignUpFormType } from "./sign-up.type"

export const SignUp = () => {
  const { mutate } = useMutationSignUp()
  const { onAlert } = useDialog()
  const { register, handleSubmit } = useForm<SignUpFormType>()

  const onSubmit = (data: SignUpFormType) => {
    /** @notice yup schema 적용시, 👇 아래 분기 삭제 */
    if (!!!data[FORM_EMAIL]) {
      onAlert({
        children: "이메일이 입력되지 않았습니다.",
        onConfirm: () => {},
      })
      return
    }
    /** @notice yup schema 적용시, 👇 아래 분기 삭제 */
    if (data[FORM_PW] !== data[FORM_PW_CONFIRM]) {
      onAlert({
        children: "비밀번호를 다시 확인해주세요.",
        onConfirm: () => {},
      })
      return
    }
    mutate({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-dvh w-[50rem] px-8">
      <h1 className="h-[8rem] w-full text-5xl font-extrabold">
        회원가입페이지입니다.
      </h1>
      <div className="flex w-full flex-col">
        <div className="h-full w-full">
          <label>email</label>
          <input
            className="h-12 w-full border-2 border-black "
            {...register(FORM_EMAIL)}
          />
          <label>password</label>
          <input
            type="password"
            className="h-12 w-full border-2 border-black"
            {...register(FORM_PW)}
          />
          <p>Confirm Password</p>
          <input
            type="password"
            className="h-12 w-full border-2 border-black"
            {...register(FORM_PW_CONFIRM)}
          />
        </div>
      </div>
      <button type="submit" className="w-full rounded-md border-2 bg-slate-300">
        JoinNow
      </button>
    </form>
  )
}
