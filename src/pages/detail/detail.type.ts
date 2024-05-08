import type { BookItemType } from "@/types"
import type { UseQueryResult } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

/* -------------------[객체 타입]---------------------- */
export type BookDetailType = BookItemType & {
  subInfo: {
    itemPage: number
    originalTitle: string
    subTitle: string
  }
  reviews?: Array<ReviewType>
}

export type ReviewType = {
  email: string
  nickname: string
  profileUrl: string
  comment: string
  rating: number
}

/* -------------------[호출 시그니처]---------------------- */
export type UseBookDetailFT = (input: {
  isbn13: string
}) => UseQueryResult<BookDetailType, Error>

export type GetBookDetailFT = (input: {
  isbn13: string
}) => Promise<BookDetailType | undefined>

export type GetBookDetailFromApiFT = (input: {
  isbn13: string
}) => Promise<BookDetailType | undefined>

export type BookDetailExtractorFT = (input: {
  responseData: BookDetailResponseType | undefined
}) => BookDetailType

export type BookDetailResponseType = {
  item: Array<BookDetailType>
}

export type ResponseConverterFT = (input: {
  response: AxiosResponse<any, any>
}) => BookDetailType | undefined
