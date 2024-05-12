import { FORM_COMMENT, FORM_RATING } from "@/constants"
import { commentSchema, ratingSchema } from "@/libs/yup"
import * as yup from "yup"

export const reviewSchema = yup.object().shape({
  [FORM_COMMENT]: commentSchema,
  [FORM_RATING]: ratingSchema,
})
