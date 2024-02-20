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
import { SingUpValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseSignUp from "./useSignUp";
import UseSignIn from "./useSignIn";
import { UseAuth } from "@/context/AuthContext";
import PassInput from "@/components/shared/PassInput";

export default function SignupForm() {
  const navigate = useNavigate();
  const { CreateUser, isPending: isCreatingUser } = UseSignUp();
  const { signIn } = UseSignIn();
  const { checkAuthUser, isLoading } = UseAuth();

  const form = useForm<z.infer<typeof SingUpValidation>>({
    resolver: zodResolver(SingUpValidation),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SingUpValidation>) {
    try {
      const newUser = await CreateUser(values);
      if (!newUser) return;
      toast.success("user has been created successfully");
      const session = await signIn({
        email: values.email,
        password: values.password,
      });
      if (!session) {
        toast.error("Something went wrong. Please login your new account");
        navigate("/sign-in");
        return;
      }
      const isLogin = await checkAuthUser();

      if (isLogin) {
        form.reset();
        navigate("/");
      } else {
        return toast.error("Sign in failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="form_bg rounded-2xl p-5 ">
      <Form {...form}>
        <div className=" flex flex-col items-center sm:w-420">
          <img src="../../public/assets/images/logo.svg"></img>
          <h2 className="h3-bold md:h2-bold  sm:pt-18 pt-5">
            create new account
          </h2>
          <p className="small-medium md:base-regular to-light-3">
            To use snapgram enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-full flex-col gap-5 space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      placeholder="Enter your user Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UserName</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      placeholder="Enter your user Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
              {isCreatingUser || isLoading ? (
                <Loader>
                  <span className="m-6 text-sm">Loading...</span>
                </Loader>
              ) : (
                "Sing up"
              )}
            </Button>

            <p className="flex-center text-small-regular mt-2 text-center">
              already have an account?{" "}
              <Link to="/sign-in" className="ml-1 text-primary-500">
                {" "}
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
}
