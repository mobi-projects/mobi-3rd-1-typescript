import type { AxiosResponse } from "axios"

export type ConvertAxiosResFT<T> = ({
  response,
}: {
  response: AxiosResponse
}) => T
