/**
 * 도서 목록 쿼리에 대한 캐싱 key
 */
export const BOOK_LIST_CACHING_KEY = "use-book-list"

/**
 * 도서 목록 유통기한
 * - 1 시간
 */
export const BOOK_LIST_STALE_TIME = 3600000 as const

/**
 * 도서 목록 페기기한
 * - 1 시간 30 분
 */
export const BOOK_LIST_GC_TIME = 5400000 as const
