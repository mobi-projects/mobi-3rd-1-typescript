import { Button } from "@/components/ui/button"
import { FORM_EMAIL, FORM_PW } from "@/constants"
import { useMutationSignIn, useSignInForm } from "../sign.hooks"
import { OnSubmitFormFT } from "../sign.type"
import { LabeledInputWithError } from "./"

export const SignInForm = () => {
  const { register, handleSubmit, errors, isValid } = useSignInForm()
  const { signIn } = useMutationSignIn()
  const onSubmitForm: OnSubmitFormFT = (form) => signIn(form)

  return (
    <form
      className="flex w-full flex-col gap-5 px-3"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <LabeledInputWithError
        errors={errors}
        label={FORM_EMAIL}
        register={register}
      />
      <LabeledInputWithError
        errors={errors}
        label={FORM_PW}
        register={register}
        inputProps={{ type: "password" }}
      />
      <Button type="submit" disabled={!isValid}>
        Login
      </Button>
    </form>
  )
}
