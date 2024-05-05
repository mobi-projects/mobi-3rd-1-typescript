import type { UseQueryResult } from "@tanstack/react-query"

export type BookItemType = {
  isbn13: string // 책 고유식별번호
  title: string
  description: string
  author: string // 작가
  publisher: string // 출판사
  cover: string // 표지 이미지 url
  priceSales: number // 판매가 (알라딘 기준)
  priceStandard: number // 정가
  adult: boolean // 성인 등급 여부 (true 인 경우, 성인 등급 도서)
  customerReviewRank: number // 알라딘 회원 평점 (0~10)
  link: string // 알라딘 판매 페이지 redirect 링크
}
export type BookListResponseType = {
  item: Array<BookItemType>
  itemsPerPage: number
  startIndex: number
  totalResults: number
}
export type GetBookListFT = (input: {
  page: number
}) => Promise<BookListResponseType>

export type UseBookListFT = (input: {
  page: number
}) => UseQueryResult<BookListResponseType, Error>
