import { useSignOut } from "@/hooks/use-sign-out"
import { Home, LogOut, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PATH_HOME, PATH_MY } from "@/constants"
import { Button } from "../ui/button"
import type { ButtonIconPT } from "./header.type"

export const Header = () => {
  const navigate = useNavigate()
  const { logout } = useSignOut()

  return (
    <div className=" flex h-[6rem] w-full flex-col justify-center border-b-2">
      <div className="flex h-1/2 w-full items-center justify-center font-extrabold">
        Chaeg Check
      </div>
      <div className="flex h-1/2 w-full justify-end IPHON_XR:justify-evenly ">
        <IconTextButton
          callback={() => {
            navigate(PATH_HOME)
          }}
          Icon={<Home />}
          text="Home"
        />
        <IconTextButton
          callback={() => {
            navigate(PATH_MY)
          }}
          Icon={<User />}
          text="MyPage"
        />
        <IconTextButton callback={logout} Icon={<LogOut />} text="LogOut" />
      </div>
    </div>
  )
}

const IconTextButton = ({ Icon, callback, text }: ButtonIconPT) => {
  return (
    <Button
      variant="ghost"
      className="flex h-full w-full max-w-[9rem] items-center justify-evenly border-none p-0 IPHON_XR:max-w-full"
      onClick={() => {
        if (callback) return callback()
      }}
    >
      {Icon}
      {text}
    </Button>
  )
}
