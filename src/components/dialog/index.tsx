import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { DialogModalProps } from "./dialog.type"

export const DialogModal = ({ modalForm, modalBtn }: DialogModalProps) => {
  return (
    <Dialog>
      <DialogTrigger className="h-fit w-fit rounded-3xl bg-slate-200 p-4 hover:bg-slate-400">
        Open
      </DialogTrigger>
      <DialogContent className="w-[20rem] rounded-3xl">
        <DialogHeader>
          {modalForm}
          <DialogClose>{modalBtn}</DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
