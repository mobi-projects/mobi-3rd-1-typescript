import { ALADIN_POINT_BOOK_DETAIL } from "@/constants"
import { aladinAxiosInstance } from "@/libs/axios"
import { BookDetailExtractorFT, BookDetailResponseType } from "./detail.type"

type GetBookDetailFT = (input: {
  isbn13: string
}) => Promise<BookDetailResponseType>

export const getBookDetail: GetBookDetailFT = async ({ isbn13 }) => {
  try {
    const response = await aladinAxiosInstance().get(ALADIN_POINT_BOOK_DETAIL, {
      params: {
        ItemId: isbn13,
        itemIdType: "ISBN13",
        OptResult: ["story", "reviewList", "cardReviewImgList"],
      },
    })
    return response.data
  } catch (e) {
    throw new Error("상세 도서 정보를 불러오지 못했습니다.")
  }
}

/**
 * BookDetailExtractor() input 에 대한 Type Guard
 */
const isBookDetailResponse = (
  input: BookDetailResponseType | undefined,
): input is BookDetailResponseType => {
  if (typeof input !== "undefined") return true
  return false
}

/**
 * 반환 결과 중, 책에 대한 상세정보만 추출합니다
 */
export const BookDetailExtractor: BookDetailExtractorFT = ({
  responseData,
}) => {
  if (!isBookDetailResponse(responseData))
    throw new Error("해당 도서에 대한 정보가 확인되지 않았습니다.")
  const _responseData = { ...responseData }
  const result = _responseData.item[0]
  return result
}
