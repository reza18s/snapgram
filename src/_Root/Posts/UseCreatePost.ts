import { CreatePostApi } from "@/api/postApi";
import { QUERY_KEYS } from "@/context/queryKey";
import { INewPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function UseCreatePost() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutateAsync: CreatePost } = useMutation({
    mutationFn: (post: INewPost) => CreatePostApi(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      toast.success("post has been created successfully");
    },
    onError: (err) => console.error(err.message),
  });
  return { isCreating, CreatePost };
}
