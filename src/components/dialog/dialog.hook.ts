import { useContext } from "react"
import { DialogContext } from "./dialog.context"
import { onAlertFT } from "./dialog.type"

export const useDialog = () => {
  const { onOpenDialog, onCloseDialog } = useContext(DialogContext)
  if (onOpenDialog == (() => {}) || onCloseDialog == (() => {}))
    throw new Error("DialogContext 설정을 다시 확인해주세요.")
  const onAlert: onAlertFT = ({ children, onConfirm }) => {
    onOpenDialog({
      onConfirm: onConfirm,
      onCancel: onCloseDialog,
      isAlert: true,
      children: children,
    })
  }
  const onModal: onAlertFT = ({ children, onConfirm }) => {
    onOpenDialog({
      onConfirm: onConfirm,
      onCancel: onCloseDialog,
      isAlert: false,
      children: children,
    })
  }
  return { onAlert, onModal }
}
