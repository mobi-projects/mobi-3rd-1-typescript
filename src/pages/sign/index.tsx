import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { D_LOGIN, D_SIGN_UP } from "@/constants/design-key"
import {
  SignUpForm,
  SignInForm,
  SignInHeader,
  SignUpHeader,
} from "./components"

export const Sign = () => {
  return (
    <Tabs defaultValue={D_LOGIN} className="IPHON_XR:px-2 w-full pt-24">
      <TabsContent value={D_LOGIN}>
        <SignInHeader />
      </TabsContent>
      <TabsContent value={D_SIGN_UP}>
        <SignUpHeader />
      </TabsContent>
      <TabsList className="dark w-full">
        <TabsTrigger value={D_LOGIN} className="w-full">
          Login
        </TabsTrigger>
        <TabsTrigger value={D_SIGN_UP} className="w-full ">
          Sign UP
        </TabsTrigger>
      </TabsList>
      <TabsContent value={D_LOGIN}>
        <SignInForm />
      </TabsContent>
      <TabsContent value={D_SIGN_UP}>
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
}
