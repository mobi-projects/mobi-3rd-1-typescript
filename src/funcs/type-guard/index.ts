export const isUndefined = (input: unknown): input is undefined =>
  typeof input === "undefined"

export const isNull = (input: unknown): input is null =>
  typeof input === "object" && !!!input

export const isString = (input: unknown): input is string =>
  typeof input === "string"

