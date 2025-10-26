import z from "zod";

export const LoginBody = z
  .object({
    email: z.string(),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string().optional(),
  image: z
    .string()
    .regex(/^https?:\/\/.+/)
    .optional(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;

export const RegisterBody = z
  .object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z
      .string()
      .min(6)
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,100}$/),
  })
  .strict()

export const SendVerifyEmailBody = z
  .object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  })
  .strict()

export type SendVerifyEmailBodyType = z.TypeOf<typeof SendVerifyEmailBody>;

export const RegisterRes = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string().optional(),
  image: z
    .string()
    .regex(/^https?:\/\/.+/)
    .optional(),
});

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LogoutRes = z.object({
  message: z.string(),
});
export type LogoutResType = z.TypeOf<typeof LogoutRes>;
