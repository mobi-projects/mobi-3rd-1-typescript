export const shallowCopy = <T extends object>({ obj }: { obj: T }) => ({
  ...obj,
})

export const deepCopy = <T extends object>({ obj }: { obj: T }) =>
  JSON.parse(JSON.stringify(obj)) as T
