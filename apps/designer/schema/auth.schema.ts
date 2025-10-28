import z from "zod";

export const LoginBodySchema = z
  .object({
    email: z.string(),
    password: z.string().min(6).max(100),
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
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email không hợp lệ" }),

    password: z
      .string()
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(100, { message: "Mật khẩu không được vượt quá 100 ký tự" })
      .refine((val) => /[a-z]/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một chữ thường",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một chữ hoa",
      })
      .refine((val) => /\d/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một chữ số",
      })
      .refine((val) => /\W/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
      }),
  })
  .strict();


export const forgotPasswordBodySchema = z.object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email không hợp lệ" }),
    }) 
    .strict();

export const changePasswordSchema = z.object({
   password: z
      .string()
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(100, { message: "Mật khẩu không được vượt quá 100 ký tự" })
      .refine((val) => /[a-z]/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một chữ thường",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một chữ hoa",
      })
      .refine((val) => /\d/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một chữ số",
      })
      .refine((val) => /\W/.test(val), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
      }),
  confirmPassword: z.string().min(8).max(100),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});


export const LogoutResSchema = z.object({
  message: z.string(),
});

export type RegisterType = z.TypeOf<typeof RegisterSchema>;
export type LoginBodyType = z.TypeOf<typeof LoginBodySchema>;
export type LoginResType = z.TypeOf<typeof LoginResSchema>;
export type SendVerifyEmailBodyType = {
  email: string,
}
export type ForgotPasswordBodyType = z.TypeOf<typeof forgotPasswordBodySchema>
export type ChangePasswordType = z.TypeOf<typeof changePasswordSchema>
export type ChangePasswordBodyType = {
  token: string,
  password: string,
}
export type LogoutResType = z.TypeOf<typeof LogoutResSchema>;
