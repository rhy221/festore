"use client";

import { useLoginMutation } from "@/queries/useAuth";
import { LoginBodySchema, LoginBodyType } from "@/schema/auth.schema";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Spinner } from "@workspace/ui/components/spinner";
import { cn } from "@workspace/ui/lib/utils";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function LoginForm() {
  const loginMutation = useLoginMutation();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const authStore = useAuthStore()
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodySchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if(authStore.isAuthenticated) {
      router.replace("/")
    }
      
  },[authStore]);

  const handleSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    try {
      const result = await loginMutation.mutateAsync(data);
      // toast("Success", {
      //   description: "Login successful!",
      // });
      if(result.accessToken) {

        authStore.login(result.user ,result.accessToken);
        // localStorage.setItem("accessToken", result.accessToken);


      // localStorage.setItem("refresh_token", result.refreshToken);
      // localStorage.setItem("user", JSON.stringify(result));
      if (callbackUrl) {
      router.push(callbackUrl); // Quay lại trang cũ
    } else {
      router.push('/'); // Hoặc về trang chủ
    }
      }
      
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
                {loginMutation.isError && (
                    <FieldError errors={[{message: (loginMutation.error as AxiosError).message}]} />
                  )}
              </Field>
            )}>
          </Controller>
        </FieldGroup>
        <Field>
          <Button type="submit" className="w-full">
            {loginMutation.isPending ? (
              <Spinner />
            ) : (
              <span>Login</span>
            )}
          </Button>
        </Field>
        
        {/* <div className="flex flex-col gap-1 text-center text-sm">
          <p>
              Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </p>
          
          <Link href="/auth/forgotpassword" className="underline underline-offset-4">
            Forgot password ?
          </Link>
        </div> */}
      </form>
  );
}
