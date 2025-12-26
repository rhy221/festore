import z from "zod";

export const LoginBodySchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().max(100),
  })
  .strict();

export const LoginResSchema = z.object({
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

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must not exceed 100 characters" })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one digit",
      })
      .refine((val) => /\W/.test(val), {
        message: "Password must contain at least one special character",
      }),
  })
  .strict();

export const forgotPasswordBodySchema = z
  .object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must not exceed 100 characters" })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one digit",
      })
      .refine((val) => /\W/.test(val), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LogoutResSchema = z.object({
  message: z.string(),
});

export type RegisterType = z.TypeOf<typeof RegisterSchema>;
export type LoginBodyType = z.TypeOf<typeof LoginBodySchema>;
export type LoginResType = {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    // bio: string,
    // status: "active" | "banned"
    // createdAt: string,
  };
  accessToken: string;
  refreshToken?: string;
};
export type SendVerifyEmailBodyType = {
  email: string;
};
export type ForgotPasswordBodyType = z.TypeOf<typeof forgotPasswordBodySchema>;
export type ChangePasswordType = z.TypeOf<typeof changePasswordSchema>;
export type ChangePasswordBodyType = {
  token: string;
  password: string;
};
export type LogoutResType = z.TypeOf<typeof LogoutResSchema>;

export type JwtPayload = {
  userId: string;
  email: string;
};