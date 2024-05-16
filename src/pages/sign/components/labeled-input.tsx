import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import type { LabeledInputPT, SignFormType } from "../sign.type"

export const LabeledInput = <T extends SignFormType>({
  register,
  label,
  registerKey,
  inputProps,
}: LabeledInputPT<T>) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label>{label}</Label>
      <Input
        {...register(registerKey)}
        placeholder={label}
        autoComplete="off"
        {...inputProps}
      />
    </div>
  )
}
