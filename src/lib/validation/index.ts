import * as z from "zod";

export const SingUpValidation = z.object({
  name: z.string().min(2, { message: "too short" }),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "pass must be at least 8 characters" }),
  // confirmPass:z.string().
});
export const SingInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "pass must be at least 8 characters" }),
  // confirmPass:z.string().
});
export const PostFormValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(5).max(200),
  tags: z.string(),
});
