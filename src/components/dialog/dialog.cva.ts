import { cva } from "class-variance-authority"

export const dialogContentVariants = cva(
  "flex flex-col items-center justify-between rounded-xl border-black bg-white px-3 py-1",
  {
    variants: {
      size: {
        alert: "h-56 w-96",
        modal: "h-fit max-h-[80dvh] min-h-[40dvh] w-[28rem]",
      },
    },
  },
)
