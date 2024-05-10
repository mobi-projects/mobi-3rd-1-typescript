import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FORM_EMAIL, FORM_PW } from "@/constants"
import { Label } from "@radix-ui/react-label"
import { useMutationSignIn, useSignInForm } from "../sign.hooks"
import { OnSubmitFormFT } from "../sign.type"
export const SignInForm = () => {
  /**
   * @notice {{ mode: 'onChange', resolver: yupResolver(schema) }} 유효성검사활성화할때 추가하면됨
   */
  const { register, handleSubmit } = useSignInForm()
  const { mutate } = useMutationSignIn()
  const onSubmitForm: OnSubmitFormFT = (form) => mutate(form)

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
        <Label>Password</Label>
        <Input
          {...register(FORM_PW)}
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
        {/* <div className="h-6 w-full">
          {errors.email || errors.password ? (
            <p className="text-[10px] text-red-600">
              *{errors.email?.message || errors.password?.message}
            </p>
          ) : null}
        </div> */}
      </div>
      <Button type="submit">Login</Button>
    </form>
  )
}
