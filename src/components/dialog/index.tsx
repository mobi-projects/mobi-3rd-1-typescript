import type { FC } from "react"
import { dialogContentVariants } from "./dialog.cva"
import type { BackgroundPT, DialogPT } from "./dialog.type"
import { X } from "lucide-react"

export const Dialog: FC<DialogPT> = ({
  children,
  onCancel,
  onConfirm,
  isAlert = true,
}) => {
  return (
    <Background {...{ onCancel }}>
      <DialogContent {...{ onCancel, onConfirm, isAlert }}>
        {children}
      </DialogContent>
    </Background>
  )
}

const Background: FC<BackgroundPT> = ({ children, onCancel }) => {
  return (
    <div
      onClick={onCancel}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40"
    >
      {children}
    </div>
  )
}

const DialogContent: FC<DialogPT> = ({
  children,
  onCancel,
  onConfirm,
  isAlert,
}) => {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
      }}
      className={dialogContentVariants({ size: isAlert ? "alert" : "modal" })}
    >
      <X onClick={onCancel} className="absolute right-2 top-2" />
      <div className="flex h-full w-full items-center justify-center border-black">
        {children}
      </div>

      {!isAlert && <ModalButtons {...{ onCancel, onConfirm }} />}
    </div>
  )
}

const ModalButtons: FC<DialogPT> = ({ onCancel, onConfirm }) => {
  return (
    <div className="flex h-14 w-full cursor-pointer items-center justify-evenly border-t-2">
      <button onClick={onCancel} className="h-full w-1/2 border-r-2">
        Cancel
      </button>
      <button
        onClick={() => {
          onConfirm()
          onCancel()
        }}
        className="h-full w-1/2"
      >
        Ok
      </button>
    </div>
  )
}
