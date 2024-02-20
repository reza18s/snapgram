import { signOut as signOutApi } from "@/api/UserApi";
import { QUERY_KEYS } from "@/context/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseSignOut() {
  const queryClient = useQueryClient();
  const { isSuccess, mutate: signOut } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      console.log("");
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return { isSuccess, signOut };
}
