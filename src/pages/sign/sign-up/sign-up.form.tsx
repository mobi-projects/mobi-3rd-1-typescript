import { useDialog } from "@/components/dialog/dialog.hook"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { useMutationSignUp } from "../sign.hooks"
import { SignUpFormType } from "../sign.type"

export const SignUpForm = () => {
  const { mutate } = useMutationSignUp()
  const { onAlert } = useDialog()
  const { register, handleSubmit } = useForm<SignUpFormType>()

  const onSubmitSignInData = (data: SignUpFormType) => {
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
    <form
      className="flex w-full flex-col gap-5 px-3"
      onSubmit={handleSubmit(onSubmitSignInData)}
    >
      <div className="grid w-full items-center gap-1.5">
        <Label>Email</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          autoComplete="off"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Passoword</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Confirm Password</Label>
        <Input
          {...register("password-confirm")}
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
        />
      </div>
      <Button type="submit">Join Now</Button>
    </form>
  )
}
