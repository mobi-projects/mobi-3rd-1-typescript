import { Button } from "@/components/ui/button"
import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import { useMutationSignUp, useSignUpForm } from "../sign.hooks"
import { OnSubmitFormFT, SignUpFormType } from "../sign.type"
import { LabeledInput } from "./labeled-input"
import { ErrorMsg } from "./error-msg"

export const SignUpForm = () => {
  const { signUp } = useMutationSignUp()
  const { register, handleSubmit, errors, isValid } = useSignUpForm()
  const onSubmitForm: OnSubmitFormFT = (form) => signUp(form)

  return (
    <form
      className="flex w-full flex-col gap-5 px-3"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <LabeledInput<SignUpFormType>
        registerKey={FORM_EMAIL}
        label="Email"
        register={register}
      />
      <ErrorMsg errorField={errors[FORM_EMAIL]} />
      <LabeledInput<SignUpFormType>
        label="Password"
        registerKey={FORM_PW}
        register={register}
        inputProps={{ type: "password" }}
      />
      <ErrorMsg errorField={errors[FORM_PW]} />
      <LabeledInput<SignUpFormType>
        label="Password Confirm"
        registerKey={FORM_PW_CONFIRM}
        register={register}
        inputProps={{ type: "password" }}
      />
      <ErrorMsg errorField={errors[FORM_PW_CONFIRM]} />
      <Button type="submit" disabled={!isValid}>
        Join Now
      </Button>
    </form>
  )
}
