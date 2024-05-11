import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogModalPT } from "./dialog.type"
import { FC } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { CircleCheckBig } from "lucide-react"

export const DialogModal: FC<DialogModalPT> = ({
  modalTrigger,
  children,
  isAlert = false,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="h-fit w-fit rounded-3xl bg-slate-200 p-4 hover:bg-slate-400">
        {modalTrigger}
      </DialogTrigger>
      <DialogContent className="flex w-[20rem] justify-center rounded-3xl ">
        <DialogHeader className="flex flex-col justify-center gap-5">
          {children}
          {isAlert && (
            <DialogClose className="flex justify-center ">
              <div className="boreder-2 w-[10rem] rounded-full bg-blue-400 p-3 hover:bg-blue-50">
                <CircleCheckBig />
              </div>
            </DialogClose>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
