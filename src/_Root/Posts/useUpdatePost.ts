import {
  delSavePost,
  deletePost,
  likePost,
  savePost,
  updatePost,
} from "@/api/postApi";
import { QUERY_KEYS } from "@/context/queryKey";
import { INewPost, IUpdatePost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLikePost() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: ({
      postId,
      likeArray,
    }: {
      postId: string;
      likeArray: string[];
    }) => likePost(postId, likeArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return { isPending, mutate };
}
export function useSavePost() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: mutate } = useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return { isPending, mutate };
}
export function useDelSavePost() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: mutate } = useMutation({
    mutationFn: (savedPostRecord: string) => delSavePost(savedPostRecord),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return { isPending, mutate };
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id: IUpdatePost) => updatePost(id),
    onSuccess: (data) => {
      console.log("");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return { isPending, mutate };
}
export function useDelPost() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (data) => {
      console.log("");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return { isPending, mutate };
}
