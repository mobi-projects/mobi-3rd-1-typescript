import { QUERY_KEY_USER } from "@/constants"
import { useQuery } from "@tanstack/react-query"
import { getUserFromPeanut } from "./use-user.func"

export const useUser = () => {
  const { data: user, ...rest } = useQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: getUserFromPeanut,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 45,
  })
  return { user, ...rest }
}
