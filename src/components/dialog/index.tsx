import type { FC } from "react"
import { dialogContentVariants } from "./dialog.cva"
import type { BackgroundPT, DialogPT } from "./dialog.type"

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
      <button
        className="flex h-10 w-full cursor-pointer items-center justify-end text-3xl"
        onClick={onCancel}
      >
        x
      </button>
      <div className="flex h-full w-full items-center justify-center border-black">
        {children}
      </div>

      {!isAlert && <ModalButtons {...{ onCancel, onConfirm }} />}
    </div>
  )
}

const ModalButtons: FC<DialogPT> = ({ onCancel, onConfirm }) => {
  return (
    <div className="flex h-16 w-full cursor-pointer items-center justify-evenly border-t-[1px] border-t-black/30">
      <button onClick={onCancel}>취소</button>

      <div className="h-full w-[0.5px] bg-black/30" />

      <button
        onClick={() => {
          onConfirm()
          onCancel()
        }}
      >
        확인
      </button>
    </div>
  )
}
