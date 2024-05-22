import { IsClickedButtonFT } from "./pagination.type"

export const goToTop = () => {
  window.scroll({ top: 0 })
}
export const isClickedButton: IsClickedButtonFT = ({
  curPage,
  buttonNumber,
}) => {
  let result = false
  if (curPage === buttonNumber) {
    result = true
  }
  return result ? "default" : "outline"
}
