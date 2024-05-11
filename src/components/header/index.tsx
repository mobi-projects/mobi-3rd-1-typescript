import { PATH_HOME, PATH_MY } from "@/constants"
import { useSignOut } from "@/hooks/use-sign-out"
import { Home, LogOut, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { BUTTON_STYLE, BUTTON_VARIANT } from "./header.constant"

export const Header = () => {
  const navigate = useNavigate()
  const { logout } = useSignOut()

  return (
    <div className=" flex h-[6rem] w-full flex-col justify-center border-b-2">
      <div className="flex h-1/2 w-full items-center justify-center font-extrabold">
        Chaeg Check
      </div>
      <div className="flex h-1/2 w-full justify-end IPHON_XR:justify-evenly">
        <Button
          variant={BUTTON_VARIANT}
          className={BUTTON_STYLE}
          onClick={() => navigate(PATH_HOME)}
        >
          <Home />
          Home
        </Button>
        <Button
          variant={BUTTON_VARIANT}
          className={BUTTON_STYLE}
          onClick={() => navigate(PATH_MY)}
        >
          <User />
          MyPage
        </Button>
        <Button
          variant={BUTTON_VARIANT}
          className={BUTTON_STYLE}
          onClick={() => logout()}
        >
          <LogOut />
          LogOut
        </Button>
      </div>
    </div>
  )
}
