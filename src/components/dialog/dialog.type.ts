import type { PropsWithChildren } from "react"

export type DialogPT = PropsWithChildren & {
  onCancel: VoidFunction
  onConfirm: VoidFunction
  isAlert?: boolean
}

export type BackgroundPT = PropsWithChildren & Pick<DialogPT, "onCancel">

export type DialogContextType = {
  onOpenDialog: onOpenDialogFT
  onCloseDialog: VoidFunction
}

export type onOpenDialogFT = (input: DialogPT) => void

export type onAlertFT = (
  input: PropsWithChildren & Partial<Pick<DialogPT, "onConfirm">>,
) => void
