import { getCurrentUser } from "@/api/UserApi";
import { QUERY_KEYS } from "@/context/queryKey";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    isLoading,
    data: CurrentUser,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: getCurrentUser,
  });

  return { isLoading, error, CurrentUser };
}
