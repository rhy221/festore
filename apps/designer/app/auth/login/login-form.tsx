"use client";

import { useLoginMutation } from "@/queries/useAuth";
import { LoginBodySchema, LoginBodyType } from "@/schema/auth.schema";
import { useRegisterStore } from "@/stores/useRegisterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function LoginForm() {
  const loginMutation = useLoginMutation();

  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodySchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    try {
      const result = await loginMutation.mutateAsync(data);
      console.log("Login result:", result);
      // toast("Success", {
      //   description: "Login successful!",
      // });
      // localStorage.setItem("access_token", result.accessToken);
      // localStorage.setItem("refresh_token", result.refreshToken);
      // localStorage.setItem("user", JSON.stringify(result));
      router.push("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <form
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(handleSubmit, (err) => {
          console.log(err);
        })}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        
         <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="m@example.com"
                  required>
                </Input>
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
            )}>
          </Controller>
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  required>
                </Input>
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
            )}>
          </Controller>
        </FieldGroup>
        <Field>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Field>
        
        <div className="flex flex-col gap-1 text-center text-sm">
          <p>
              Don&apos;t have an account?{" "}
            <a href="/auth/register" className="underline underline-offset-4">
              Sign up
            </a>
          </p>
          
          <a href="/auth/forgotpassword" className="underline underline-offset-4">
            Forgot password ?
          </a>
        </div>
      </form>
  );
}
