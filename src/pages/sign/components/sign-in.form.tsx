import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FORM_EMAIL, FORM_PW } from "@/constants"
import { Label } from "@radix-ui/react-label"
import { useMutationSignIn, useSignInForm } from "../sign.hooks"
import { OnSubmitFormFT } from "../sign.type"
import { ErrorMsg } from "./error-msg"

export const SignInForm = () => {
  const { register, handleSubmit, errors, isValid } = useSignInForm()
  const { signIn } = useMutationSignIn()
  const onSubmitForm: OnSubmitFormFT = (form) => signIn(form)

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
        <ErrorMsg errorField={errors[FORM_EMAIL]} />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Password</Label>
        <Input
          {...register(FORM_PW)}
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
        <ErrorMsg errorField={errors[FORM_PW]} />
      </div>
      <Button type="submit" disabled={!isValid}>
        Login
      </Button>
    </form>
  )
}
