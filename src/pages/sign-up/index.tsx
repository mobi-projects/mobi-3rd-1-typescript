import { PATH_HOME } from "@/constants"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
  type SignUpDataType = Record<
    "userId" | "password" | "passwordConfirm",
    string
  >
  const navi = useNavigate()
  /**
   * @notice {{ mode: 'onChange', resolver: yupResolver(schema) }} 유효성검사활성화할때 추가하면됨
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDataType>()

  type onSubmitSignUpDataFT = (input: SignUpDataType) => void

  const onSubmitSignUpData: onSubmitSignUpDataFT = (data) => {
    alert(data)
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitSignUpData)}
      className="h-dvh w-[50rem] px-8"
    >
      <h1 className="h-[8rem] w-full text-5xl font-extrabold">
        회원가입페이지입니다.
      </h1>
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
          <p>Confirm Password</p>
          <input
            type="password"
            className="h-12 w-full border-2 border-black"
            {...register("passwordConfirm")}
          />
        </div>
      </div>
      <button
        onClick={() => navi(PATH_HOME)}
        type="submit"
        className="w-full rounded-md border-2 bg-slate-300"
      >
        JoinNow
      </button>
    </form>
  )
}
