import { createUserApi } from "@/api/UserApi";
import { INewUser } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function UseSignUp() {
  const { mutateAsync: CreateUser, isPending } = useMutation({
    mutationFn: (obj: INewUser) => createUserApi(obj),
    onError: (err) => console.error(err.message),
  });
  return { CreateUser, isPending };
}
