import { Button } from "@/components/ui/button"
import { FORM_EMAIL, FORM_PW } from "@/constants"
import { useMutationSignIn, useSignInForm } from "../sign.hooks"
import { OnSubmitFormFT } from "../sign.type"
import { LabeledInput } from "./labeled-input"
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
      <LabeledInput
        registerKey={FORM_EMAIL}
        label="Email"
        register={register}
      />
      <ErrorMsg errorField={errors[FORM_EMAIL]} /> 
      <LabeledInput
        registerKey={FORM_PW}
        register={register}
        label="Password"
        inputProps={{ type: "password" }}
      />
      <ErrorMsg errorField={errors[FORM_PW]} />
      <Button type="submit" disabled={!isValid}>
        Login
      </Button>
    </form>
  )
}
