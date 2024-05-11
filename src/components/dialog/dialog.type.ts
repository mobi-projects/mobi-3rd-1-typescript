import type { PropsWithChildren, ReactNode } from "react"

export type DialogModalPT = PropsWithChildren & {
  modalTrigger: ReactNode
  isAlert?: boolean
}
