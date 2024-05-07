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
  categoryName: string // 카테고리 정보 (ex) "국내도서>잡지>종교")

  itemId: number // 서드 파티에서 상품을 구분하는 고유값
}
