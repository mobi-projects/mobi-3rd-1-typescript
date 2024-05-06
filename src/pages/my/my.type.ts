export type UserDataType = {
  data: Record<"nickName" | "location", string>
  profileUrl: string | null
  userId: string
}
export type PatchUserInfoFT = () => Promise<UserDataType>

export type UpdataDataType = Record<"nickName" | "password", string>

export type UserUpdateDataType = {
  data: UpdataDataType
  profileUrl: string | null
  userId: string
}

export type PatchUserUpdateInfoFT = (
  data: UpdataDataType,
) => Promise<UserUpdateDataType>
