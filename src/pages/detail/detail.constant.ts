import { BookDetailType } from "./detail.type"

/**
 * 도서 상세정보 유통기한
 * - 1 시간
 */
export const BOOK_DETAIL_STALE_TIME = 3600000

/**
 * 도서 상세정보 페기기한
 * - 1 시간 30 분
 */
export const BOOK_DETAIL_GC_TIME = 5400000

/**
 * [도서상세정보] 템플릿
 */
export const BOOK_DETAIL_TEMPLATE: BookDetailType = {
  isbn13: "",
  title: "",
  description: "",
  author: "",
  publisher: "",
  cover: "",
  priceSales: -1,
  priceStandard: -1,
  adult: false,
  itemId: -1,
  link: "",
  customerReviewRank: -1,
  categoryName: "",
  subInfo: {
    itemPage: -1,
    originalTitle: "",
    subTitle: "",
  },
  reviews: [],
} as const
