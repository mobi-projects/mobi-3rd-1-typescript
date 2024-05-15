import { FieldError } from "react-hook-form"

export const isUndefined = (input: unknown): input is undefined =>
  typeof input === "undefined"

export const isNull = (input: unknown): input is null =>
  typeof input === "object" && !!!input

export const isString = (input: unknown): input is string =>
  typeof input === "string"

export const isFieldError = (error: any): error is FieldError => {
  return error?.message !== undefined
}
