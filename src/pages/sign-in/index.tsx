import { PATH_HOME, PATH_SIGN_UP } from "@/constants"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { postUserSignin } from "./sign-in.func"

export const SignIn = () => {
  type SignupDataType = Record<"userId" | "password", string>
  const navi = useNavigate()
  /**
   * @notice {{ mode: 'onChange', resolver: yupResolver(schema) }} 유효성검사활성화할때 추가하면됨
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupDataType>()

  type onSubmitLoginDataFT = (input: SignupDataType) => void

  const onSubmitLoginData: onSubmitLoginDataFT = async (data) => {
    try {
      const response = await postUserSignin(data)
      if (response) {
        navi(PATH_HOME)
      }
    } catch {
      alert("로그인실패 후에 다른 액션으로 수정하자")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitLoginData)}
      className="h-dvh w-[50rem] px-8"
    >
      <h1 className="h-[8rem] w-full text-7xl font-extrabold">Loginddd</h1>
      <div className="flex w-full flex-col">
        <div className="h-full w-full">
          <p>email</p>
          <input
            className="h-12 w-full border-2 border-black "
            {...register("userId")}
          />
          <p>password</p>
          <input
            type="password"
            className="h-12 w-full border-2 border-black"
            {...register("password")}
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <button
          type="submit"
          className="w-full rounded-md border-2 bg-slate-300"
        >
          Login
        </button>
        <button type="button" onClick={() => navi(PATH_SIGN_UP)}>
          아직도 가입안함? <strong className="font-bold"> 가입 ㄱㄱ</strong>
        </button>
      </div>
    </form>
  )
}
/**
 * @notice
 * 추후에 resolver가 추가되면 
 * const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  }
}
 로직을 추가해야합니다.
 */
