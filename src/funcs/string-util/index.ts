import type {
  ReplaceMidSubstringToStar,
  SpliceStringFT,
} from "./string-util.type"
/**
 * 입력으로 받은 문자열의 중간 부분을 *로 대체합니다.
 * @param origin 원본 문자열
 * @param excludeStart 대체되지 않을 앞 부분 문자갯수
 * @param excludeBack 대체되지 않을 뒷 부분의 문자갯수
 */
export const replaceMidSubstringToStar: ReplaceMidSubstringToStar = ({
  origin,
  excludeFront = 0,
  excludeBack = 0,
}) => {
  const originLength = origin.length
  if (originLength <= excludeFront + excludeBack)
    throw new Error("입력된 문자열의 길이가 너무 짧습니다.")
  const frontString = origin.substring(0, excludeFront)
  const backString = origin.substring(originLength - excludeBack)
  const middleStringSize = originLength - excludeFront - excludeBack
  const middleString = Array.from({ length: middleStringSize })
    .fill("*")
    .join("")
  return frontString + middleString + backString
}
/**
 * 주어진 시작 위치와 길이에 따라 문자열을 잘라줍니다.
 * @param input 원본 문자열
 * @param startIndex 시작 위치
 * @param length 잘라낼 길이
 */
export const spliceString: SpliceStringFT = ({
  origin,
  length,
  startIndex = 0,
}) => {
  const originLength = origin.length
  if (startIndex < 0 || startIndex >= originLength)
    throw new Error("시작 위치가 올바르지 않습니다.")
  if (originLength < length) return origin
  const endIndex = startIndex + length
  return origin.substring(startIndex, endIndex)
}
