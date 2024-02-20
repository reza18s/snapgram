import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SingInValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseSignIn from "./useSignIn";
import { UseAuth } from "@/context/AuthContext";
import PassInput from "@/components/shared/PassInput";

export default function SigninForm() {
  const navigate = useNavigate();

  const { signIn, isPending: isSingIn } = UseSignIn();
  const { checkAuthUser, isLoading } = UseAuth();
  const form = useForm<z.infer<typeof SingInValidation>>({
    resolver: zodResolver(SingInValidation),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SingInValidation>) {
    const session = await signIn(values);
    if (!session) {
      return toast.error("Sign in failed");
    }
    const isLogin = await checkAuthUser();
    console.log(isLogin);
    if (isLogin) {
      form.reset();
      navigate("/");
    } else {
      return toast.error("Sign in failed");
    }
  }
  return (
    <div className="form_bg rounded-2xl p-5 ">
      <Form {...form}>
        <div className=" flex flex-col items-center sm:w-420">
          <img src="../../public/assets/images/logo.svg"></img>
          <h2 className="h3-bold md:h2-bold  sm:pt-18 pt-5">
            Login in your account
          </h2>
          <p className="small-medium md:base-regular mt-4 to-light-3">
            To use snapgram enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-full flex-col gap-5 space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      placeholder="Enter your user Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PassInput field={field}></PassInput>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <div className="m-0 h-1"> </div>

            <Button
              type="submit"
              className="bg_but shad-button_primary m-0 h-10 w-full"
            >
              {isSingIn || isLoading ? (
                <Loader>
                  <span className="m-6 text-sm">Loading...</span>
                </Loader>
              ) : (
                "Sing in"
              )}
            </Button>

            <p className="flex-center text-small-regular mt-2 text-center">
              don't have an account?{" "}
              <Link to="/sign-up" className="ml-1 text-primary-500">
                {" "}
                sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
}
