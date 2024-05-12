import type { AddCommasToAmountFT } from "./calculate.type"

/**
 * @param amount 책의 가격을 입력받습니다.
 * @returns 세자리마다 , 가 붙혀진 string을 반환합니다.
 */
export const addCommasToAmount: AddCommasToAmountFT = ({ amount }) => {
  const stringAmountArr = amount.toString().split("")
  let count = 0
  for (let i = stringAmountArr.length - 1; i >= 0; i--) {
    count++
    if (count === 3 && i !== 0) {
      stringAmountArr[i] = "," + stringAmountArr[i]
      count = 0
    }
  }
  return stringAmountArr.join("")
}
