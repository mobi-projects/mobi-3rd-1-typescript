import { ALADIN_POINT_BOOK_DETAIL, API_BOOK } from "@/constants"
import { aladinAxiosInstance, baseAxiosInstance } from "@/libs/axios"
import { BOOK_DETAIL_TEMPLATE } from "./detail.constant"
import type {
  AddBookReviewsFT,
  BookDetailType,
  GetBookDetailFT,
  GetBookDetailFromApiFT,
  GetDiscountRateFT,
  PostReviewOnPeanutFT,
  ResponseConverterFT,
} from "./detail.type"

/**
 * [도서상세정보] 에 대하여, api 호출 후 결과 반환하기
 * - isbn13 으로 peanut 서버에 있는지 먼저 조회합니다.
 * - 있다면 그 결과를 반환하고, 없을 경우 아래절차를 따릅니다.
 * - 서드파티 api 를 호출하고 반환된 결과를 peanut 서버로 전달 후, 반환합니다.
 */
export const getBookDetail: GetBookDetailFT = async ({ isbn13 }) => {
  const bookDetailFromPeanut = await getBookDetailFromPeanut({ isbn13 })
  if (isBookDetail(bookDetailFromPeanut)) return bookDetailFromPeanut

  const bookDetailFromThirdParty = await getBookDetailFromAladin({ isbn13 })
  if (isBookDetail(bookDetailFromThirdParty)) {
    await postBookDetailOnPeanut({
      isbn13,
      bookDetail: bookDetailFromThirdParty,
    })
  }
  return bookDetailFromThirdParty
}

/**
 * 새 리뷰 등록하기
 * - BookDetail 객체의 속성 중, reviews 배열에 새로운 Review 객체를 추가합니다.
 * - 위의 결과로 만들어진 BookDetail 객체를 서버로 전송합니다.
 * - 응답 결과의 형태를 적절히 변형하여 반환합니다.
 */
export const postReviewOnPeanut: PostReviewOnPeanutFT = async ({
  isbn13,
  bookDetail,
  review,
}) => {
  try {
    const updatedBookDetail = addBookReviews({
      bookDetail,
      review,
    })
    const response = await baseAxiosInstance.post(API_BOOK, {
      key: isbn13,
      book: updatedBookDetail,
    })
    const result = postReviewResConverter({ response })
    return result
  } catch {
    throw new Error("댓글 수정이 완료되지 않았습니다.")
  }
}

/**
 * BookDetail 객체의 속성 중, reviews 배열에 새로운 Review 객체를 추가합니다.
 */
const addBookReviews: AddBookReviewsFT = ({ bookDetail, review }) => {
  const _bookDetail = { ...bookDetail }
  const _review = { ...review }
  _bookDetail.reviews = [_review, ...bookDetail.reviews]
  return _bookDetail
}

/**
 * 알라딘 api 통해서, [도서상세정보] 조회하기
 */
export const getBookDetailFromAladin: GetBookDetailFromApiFT = async ({
  isbn13,
}) => {
  try {
    const response = await aladinAxiosInstance().get(ALADIN_POINT_BOOK_DETAIL, {
      params: {
        ItemId: isbn13,
        itemIdType: "ISBN13",
        OptResult: ["story", "reviewList", "cardReviewImgList"],
      },
    })
    const bookDetail = responseConverterForAladin({ response })
    return bookDetail
  } catch (e) {
    throw new Error(
      "third-party-server 로부터 [도서상세정보] 를 불러오지 못했습니다.",
    )
  }
}
/**
 * peanut api 통해서, isbn13 에 대한 [도서상세정보] 조회하기
 */
export const getBookDetailFromPeanut: GetBookDetailFromApiFT = async ({
  isbn13,
}) => {
  try {
    const response = await baseAxiosInstance.get(API_BOOK, {
      params: {
        key: isbn13,
        page: 1,
      },
    })
    const bookDetail = responseConverterForPeanut({ response })
    return bookDetail
  } catch (e) {
    throw new Error("main-server 로부터 [도서상세정보] 를 불러오지 못했습니다.")
  }
}
/**
 * peanut api 통해서, [도서상세정보] 저장하기
 */
export const postBookDetailOnPeanut = async ({
  isbn13,
  bookDetail,
}: {
  isbn13: string
  bookDetail: BookDetailType
}) => {
  try {
    await baseAxiosInstance.post(API_BOOK, {
      key: isbn13,
      book: bookDetail,
    })
  } catch (e) {
    throw new Error("main-server 에 [도서상세정보] 를 저장하지 못했습니다.")
  }
}
/**
 * axios response 를 우리 서비스의 "도서" 관리 형태로 변환
 * - peanut api 전용
 */
const responseConverterForPeanut: ResponseConverterFT = ({ response }) => {
  if (!!!response.data.data.length) return undefined
  return response.data.data[0].data.book
}
/**
 * axios response 를 우리 서비스의 "도서" 관리 형태로 변환
 * - 리뷰 게시 결과를 변환
 */
const postReviewResConverter: ResponseConverterFT = ({ response }) => {
  return response.data.data.book
}

/**
 * axios response 를 우리 서비스의 "도서" 관리 형태로 변환
 * - aladin api 전용
 */
const responseConverterForAladin: ResponseConverterFT = ({ response }) => {
  const responseData = response?.data.item[0]
  if (typeof response === "undefined") return responseData
  const bookDetail: BookDetailType = { ...BOOK_DETAIL_TEMPLATE }
  bookDetail.isbn13 = responseData.isbn13
  bookDetail.title = responseData.title
  bookDetail.description = responseData.description
  bookDetail.author = responseData.author
  bookDetail.publisher = responseData.publisher
  bookDetail.cover = responseData.cover
  bookDetail.priceSales = responseData.priceSales
  bookDetail.priceStandard = responseData.priceStandard
  bookDetail.adult = responseData.adult
  bookDetail.itemId = responseData.itemId
  bookDetail.link = responseData.link
  bookDetail.customerReviewRank = responseData.customerReviewRank
  bookDetail.categoryName = responseData.categoryName
  bookDetail.subInfo.itemPage = responseData.subInfo.itemPage
  bookDetail.subInfo.originalTitle = responseData.subInfo.originalTitle
  bookDetail.subInfo.subTitle = responseData.subInfo.subTitle
  return bookDetail
}

/**
 * 전달된 파라미터의 타입이 BookDetailType 인지를 위한 타입가드
 */
export const isBookDetail = (
  input: BookDetailType | undefined,
): input is BookDetailType => {
  if (typeof input !== "undefined") return true
  return false
}

export const getDiscountRate: GetDiscountRateFT = ({ standard, sale }) => {
  return Math.ceil((1 - sale / standard) * 100)
}
