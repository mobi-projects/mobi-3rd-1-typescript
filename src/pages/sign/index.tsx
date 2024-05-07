import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { D_LOGIN, D_SIGN_UP } from "@/constants/design-key"
import { SignIn } from "./sign.in"
import { SignUp } from "./sign.up"

export const Sign = () => {
  return (
    <div className="IPHON_XR:px-2">
      <Tabs defaultValue={D_LOGIN} className="w-full pt-10">
        <TabsList className="w-full">
          <TabsTrigger value={D_LOGIN} className=" w-full">
            Login
          </TabsTrigger>
          <TabsTrigger value={D_SIGN_UP} className="w-full ">
            Sign UP
          </TabsTrigger>
        </TabsList>
        <TabsContent value={D_LOGIN}>
          <SignIn />
        </TabsContent>
        <TabsContent value={D_SIGN_UP}>
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  )
}
