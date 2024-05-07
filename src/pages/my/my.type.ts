export type UpdataDataType = Record<"nickName", string>

export type UserDataType = {
  data: UpdataDataType
  profileUrl: string | null
  userId: string
}

export type PatchUserInfoFT = () => Promise<UserDataType>

export type PatchUserUpdateInfoFT = (
  data: UpdataDataType,
) => Promise<UserDataType>
