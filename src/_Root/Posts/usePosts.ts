import { getPosts } from "@/api/postApi";
import { QUERY_KEYS } from "@/context/queryKey";
import { useQuery } from "@tanstack/react-query";

export function usePost() {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: getPosts,
  });

  return { isLoading, error, posts };
}
