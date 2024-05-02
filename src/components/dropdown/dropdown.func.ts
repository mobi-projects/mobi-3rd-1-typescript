import { SORT_PAGE } from "@/constants/url-keys"
import type { GetKeyFuncProps } from "./dropdown.types"

/**
 * @param option : Dropdown컴포넌트생성시 입력된 option
 * @description : option에 따라서 해당 옵션과 맞는 urlKey를 return하는 함수 ex) option = "perPage" => urlKey = SORT_PAGE
 */
export const getUrlkeyByOption: GetKeyFuncProps = ({ option }) => {
  let urlKey = ""
  if (option === "perPage") {
    return (urlKey = SORT_PAGE)
  }

  return urlKey
}
