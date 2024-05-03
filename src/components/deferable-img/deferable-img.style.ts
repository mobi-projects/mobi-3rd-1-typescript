import { cva } from "class-variance-authority"

export const deferableImgVariants = cva("", {
  variants: {
    radio: {
      square: ["aspect-square"],
      portrait: ["aspect-[9/16]"],
      landscape: ["aspect-[3/2]"],
    },
    radius: {
      round: ["rounded-full"],
      small: ["rounded-lg"],
      big: ["rounded-sm"],
    },
    size: {
      small: ["h-20"],
      middle: ["h-32"],
      big: ["h-64"],
      full: ["h-full, w-full"],
    },
  },
  defaultVariants: {
    radio: "square",
    radius: "round",
    size: "small",
  },
})
