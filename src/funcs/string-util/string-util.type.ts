export type ReplaceMidSubstringToStar = (input: {
  origin: string
  excludeFront?: number
  excludeBack?: number
}) => string

export type SpliceStringFT = (input: {
  origin: string
  length: number
  startIndex?: number
}) => string

export type CapitalizeFT = ({ word }: { word: string }) => string
