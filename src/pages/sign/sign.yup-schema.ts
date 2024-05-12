import { FORM_EMAIL, FORM_PW, FORM_PW_CONFIRM } from "@/constants"
import { emailSchema, passwordConfirmSchema, passwordSchema } from "@/libs/yup"
import * as yup from "yup"

export const signInSchema = yup.object().shape({
  [FORM_EMAIL]: emailSchema,
  [FORM_PW]: passwordSchema,
})

export const signUpSchema = yup.object().shape({
  [FORM_EMAIL]: emailSchema,
  [FORM_PW]: passwordSchema,
  [FORM_PW_CONFIRM]: passwordConfirmSchema,
})
