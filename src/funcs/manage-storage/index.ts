import { isNull, isString } from "@/funcs"

/**
 * LocalStorage 에 value 를 저장합니다.
 */
export const saveToLocalStorage: saveToLocalFT = ({ key, value }) => {
  if (isString(value)) localStorage.setItem(key, value)
  else localStorage.setItem(key, JSON.stringify(value))
}
/**
 * LocalStorage 에서 key 로 등록된 값을 가져옵니다.
 */
export const getFromLocalStorage: getFromLocalStorageFT = ({ key }) => {
  const found = localStorage.getItem(key)
  if (isNull(found)) return ""
  return found
}
/**
 * LocalStorage 에서 key 로 등록된 값을 제거합니다.
 */
export const removeFromLocalStorage: removeFromLocalStorageFT = ({ key }) => {
  localStorage.removeItem(key)
}
