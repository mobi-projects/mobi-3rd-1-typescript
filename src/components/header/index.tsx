import { useSignOut } from "@/hooks/use-sign-out"
import { Home, LogOut, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PATH_HOME, PATH_MY } from "@/constants"
import { Button } from "../ui/button"
import type { IconTextButtonPT } from "./header.type"
import logo from "/chaeg-check.svg"
export const Header = () => {
  const navigate = useNavigate()
  const { logout } = useSignOut()

  return (
    <div className=" relative flex h-[6rem] w-full flex-col justify-center border-b-2 bg-slate-50">
      <img
        src={logo}
        alt="Logo"
        className="absolute left-5 h-full w-16 cursor-pointer rounded-full IPHON_XR:left-1 IPHON_XR:top-1 IPHON_XR:h-1/2"
        onClick={() => navigate(PATH_HOME)}
      />
      <div className="flex h-1/2 w-full items-center justify-center font-extrabold IPAD_PRO:text-2xl">
        Chaeg Check
      </div>
      <div className="flex h-1/2 w-full justify-end IPHON_XR:justify-evenly ">
        <IconTextButton
          callback={() => {
            navigate(PATH_HOME)
          }}
          icon={Home}
          text="Home"
        />
        <IconTextButton
          callback={() => {
            navigate(PATH_MY)
          }}
          icon={User}
          text="MyPage"
        />
        <IconTextButton callback={logout} icon={LogOut} text="LogOut" />
      </div>
    </div>
  )
}

const IconTextButton = ({ icon: Icon, callback, text }: IconTextButtonPT) => {
  return (
    <Button
      variant="ghost"
      className="flex h-full w-full max-w-[9rem] items-center justify-evenly border-none p-0 IPHON_XR:max-w-full"
      onClick={() => callback()}
    >
      <Icon />
      {text}
    </Button>
  )
}
