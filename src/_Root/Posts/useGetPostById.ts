import { getPostById } from "@/api/postApi";
import { QUERY_KEYS } from "@/context/queryKey";
import { useQuery } from "@tanstack/react-query";

export function useGetPostById(postId) {
  const { isLoading, data, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  return { isLoading, error, data };
}
