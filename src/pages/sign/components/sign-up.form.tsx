import { Button } from "@/components/ui/button"
import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import { useMutationSignUp, useSignUpForm } from "../sign.hooks"
import { OnSubmitFormFT, SignUpFormType } from "../sign.type"
import { LabeledInputWithError } from "./"

export const SignUpForm = () => {
  const { signUp } = useMutationSignUp()
  const { register, handleSubmit, errors, isValid } = useSignUpForm()
  const onSubmitForm: OnSubmitFormFT = (form) => signUp(form)

  return (
    <form
      className="flex w-full flex-col gap-5 px-3"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <LabeledInputWithError<SignUpFormType>
        errors={errors}
        label={FORM_EMAIL}
        register={register}
      />
      <LabeledInputWithError<SignUpFormType>
        errors={errors}
        label={FORM_PW}
        register={register}
        inputProps={{ type: "password" }}
      />
      <LabeledInputWithError<SignUpFormType>
        errors={errors}
        label={FORM_PW_CONFIRM}
        register={register}
        inputProps={{ type: "password" }}
      />
      <Button type="submit" disabled={!isValid}>
        Join Now
      </Button>
    </form>
  )
}
