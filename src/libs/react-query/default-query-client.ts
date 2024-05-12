import { QueryClient } from "@tanstack/react-query"

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
})
