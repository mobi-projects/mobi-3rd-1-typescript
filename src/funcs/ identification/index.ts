import { v4 as uuidv4 } from "uuid"
import { isUndefined } from "../type-guard"
import { GenerateUUIDFT } from "./identification.type"

/* 고유값/식별번호 생성 등의 함수 관리 */

export const generateUUID: GenerateUUIDFT = ({ prefix, postfix }) => {
  let id = uuidv4()
  if (!isUndefined(prefix)) id = prefix + id
  if (!isUndefined(postfix)) id += postfix
  return id
}
