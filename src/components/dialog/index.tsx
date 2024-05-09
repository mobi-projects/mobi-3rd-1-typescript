import type { FC } from "react"
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

/** `Pagination` 에서 분리시킬 (부품) 컴포넌트가 있다면, export 없이 이 아래(👇) 작성해주세요.! */

const Background: FC<BackgroundPT> = ({ children, onCancel }) => {
  return (
    <div
      onClick={onCancel}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/25"
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
      className="flex h-40 w-96 flex-col items-center justify-between border-2 border-black bg-white"
    >
      <div
        className="flex h-10 w-full items-center justify-end pr-3"
        onClick={onCancel}
      >
        x
      </div>
      <div className="flex h-full w-full items-center justify-center border-b-2 border-black">
        {children}
      </div>
      {!isAlert && (
        <div className="flex h-20 w-full items-center justify-around">
          <button onClick={onCancel}>취소</button>
          <button
            onClick={() => {
              onConfirm()
              onCancel()
            }}
          >
            확인
          </button>
        </div>
      )}
    </div>
  )
}
