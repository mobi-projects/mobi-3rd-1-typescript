import type { BookItemType } from "@/types"

export type BookDetailResponseType = {
  totalResults: number
  item: Array<BookDetailType>
}

export type BookDetailType = BookItemType & {
  subInfo: {
    itemPage: number
    originalTitle: string
    subTitle: string
  }
}

export type GetBookDetailFT = (input: {
  isbn13: string
}) => Promise<BookDetailResponseType>

export type BookDetailExtractorFT = (input: {
  responseData: BookDetailResponseType | undefined
}) => BookDetailType
