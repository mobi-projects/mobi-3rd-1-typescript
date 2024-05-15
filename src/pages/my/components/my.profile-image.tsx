import { ImagePlus } from "lucide-react"
import { useMutateUpdateProfile } from "../my.hook"
import { UserType } from "@/types"
import MainLogo from "@/assets/main-logo.webp"

export const ProfileImage = ({ profileUrl }: UserType) => {
  const { updateProfile } = useMutateUpdateProfile()
  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.currentTarget.files) {
      formData.append("image", e.currentTarget.files[0])
      updateProfile(formData)
    }
  }
  return (
    <div className=" flex items-center justify-center IPHON_XR:h-[15rem] SF_DUO:h-[50%] IPAD_PRO:h-[29rem] IPAD_PRO:justify-start">
      <div className=" flex h-full w-[18rem]  flex-col items-center  justify-center rounded-xl border-2 border-solid border-slate-300 bg-slate-200 drop-shadow-2xl">
        <div className=" flex h-full w-full flex-col  items-center justify-between pb-[2rem] pt-[2rem]">
          <div className="relative h-[13rem]  w-[13rem] cursor-pointer   rounded-3xl">
            <img
              src={
                profileUrl ||
                "https://github.com/mobi-projects/mobi-3rd-1-typescript/assets/144839872/570386fe-4508-487d-9eb9-306c2f7cc24f"
              }
              className="absolute h-full w-full rounded-full"
            />
            <input
              onChange={onChangeProfileImage}
              type="file"
              accept="image/*"
              className=" peer absolute z-20 flex h-full w-full items-center justify-center rounded-full opacity-0 "
            />
            <div className="absolute flex h-full w-full items-center justify-center  rounded-full bg-slate-300 font-bold opacity-0 peer-hover:opacity-70">
              <ImagePlus size={"6rem"} />
            </div>
          </div>
          <img
            src={MainLogo}
            className=" h-[4.5rem] w-[4.5rem] rounded-full IPHON_XR:h-[3rem] IPHON_XR:w-[3rem]"
          />
        </div>
      </div>
    </div>
  )
}
