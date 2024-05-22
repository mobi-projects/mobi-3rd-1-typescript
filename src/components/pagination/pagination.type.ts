import type { LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export type ChangeParamsValueFT = (input: Record<"urlKey" | "value", string>) => void
export type GetParamValue = ({urlKey}:{urlKey:string})=>string
export type ArrowIconPT = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  clickCallback: VoidFunction
}

export type OnClickNumBtnFT = ({
  buttonNumber,
}: {
  buttonNumber: number
}) => void
export type IsClickedButtonFT = ({
  curPage,
  buttonNumber,
}: Record<"curPage" | "buttonNumber", number>) => "default" | "outline"
