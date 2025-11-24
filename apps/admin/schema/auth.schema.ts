import z from "zod";

export const LoginBodySchema = z
  .object({
    email: z.string(),
    password: z.string().max(100),
  })
  .strict();

export const LoginResSchema = z.object({
  avatarUrl: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

export type LoginBodyType = z.TypeOf<typeof LoginBodySchema>;
export type LoginResType = z.TypeOf<typeof LoginResSchema>;
