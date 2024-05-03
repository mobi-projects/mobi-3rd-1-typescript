import type { FC, PropsWithChildren } from "react"
import { createContext, useState } from "react"
import { Dialog } from "./"
import type { DialogContextType, DialogPT, onOpenDialogFT } from "./dialog.type"

const contextInit = {
  onOpenDialog: () => {},
  onCloseDialog: () => {},
}

export const DialogContext = createContext<DialogContextType>(contextInit)
export const DialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [attributes, setAttributes] = useState<Array<DialogPT>>([])
  const onOpenDialog: onOpenDialogFT = (input) => {
    setAttributes((prev) => [...prev, input])
  }
  const onCloseDialog = () => {
    setAttributes((prev) => {
      const _prev = [...prev]
      _prev.pop()
      return _prev
    })
  }
  return (
    <DialogContext.Provider value={{ onOpenDialog, onCloseDialog }}>
      {children}
      {attributes.map((attribute, idx) => (
        <Dialog key={idx} {...{ ...attribute }}>
          {attribute.children}
        </Dialog>
      ))}
    </DialogContext.Provider>
  )
}
