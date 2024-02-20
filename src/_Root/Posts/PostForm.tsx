import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PostFormValidation } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import FileUploader from "./FileUploader";
import { Models } from "appwrite";
import UseCreatePost from "./UseCreatePost";
import { useUser } from "@/_auth/useUser";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "@/components/shared/Loader";
type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};
export function PostForm({ post, action }: PostFormProps) {
  const [fileUrl, setFileUrl] = useState(post ? post.image : "");
  const { isCreating, CreatePost } = UseCreatePost();
  const { CurrentUser } = useUser();
  const form = useForm<z.infer<typeof PostFormValidation>>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });
  async function onSubmit(values: z.infer<typeof PostFormValidation>) {
    try {
      console.log(values);
      const newPost = await CreatePost({ ...values, userId: CurrentUser?.$id });
      if (!newPost) return toast.error("please try again later!");
      form.reset();
      setFileUrl("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-5xl flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar "
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <FileUploader
                  onChange={field.onChange}
                  fileUrl={fileUrl}
                  setFileUrl={setFileUrl}
                ></FileUploader>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Location</FormLabel>
              <FormControl>
                <Input className="shad-input  " {...field}></Input>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label ">
                Add Tags (separated by comma ",")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input "
                  placeholder="JS,React,NextJS"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4 ">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button type="submit" className="shad-button_primary bg_but w-[80px]">
            {isCreating ? <Loader className=""></Loader> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
