import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import { Label } from "@radix-ui/react-label"
import { useMutationSignUp, useSignUpForm } from "../sign.hooks"
import { OnSubmitFormFT } from "../sign.type"

export const SignUpForm = () => {
  const { signUp } = useMutationSignUp()
  const { register, handleSubmit } = useSignUpForm()
  const onSubmitForm: OnSubmitFormFT = (form) => signUp(form)

  return (
    <form
      className="flex w-full flex-col gap-5 px-3"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="grid w-full items-center gap-1.5">
        <Label>Email</Label>
        <Input
          {...register(FORM_EMAIL)}
          type="email"
          placeholder="Email"
          autoComplete="off"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Passoword</Label>
        <Input
          {...register(FORM_PW)}
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Confirm Password</Label>
        <Input
          {...register(FORM_PW_CONFIRM)}
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
        />
      </div>
      <Button type="submit">Join Now</Button>
    </form>
  )
}
