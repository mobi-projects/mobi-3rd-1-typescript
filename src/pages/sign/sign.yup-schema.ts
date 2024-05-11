import { FORM_EMAIL, FORM_PW } from "@/constants"
import { emailSchema, passwordSchema } from "@/libs/yup"
import * as yup from "yup"

export const signInSchema = yup.object().shape({
  [FORM_EMAIL]: emailSchema,
  [FORM_PW]: passwordSchema,
})
