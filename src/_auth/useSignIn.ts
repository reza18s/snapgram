import { singInAccount } from "@/api/UserApi";
import { useMutation } from "@tanstack/react-query";

export default function UseSignIn() {
  const { mutateAsync: signIn, isPending } = useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      singInAccount(user),
    onError: (err) => console.error(err.message),
  });
  return { signIn, isPending };
}
