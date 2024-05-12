import { QueryClient } from "@tanstack/react-query"

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      throwOnError: true,
    },
  },
})
