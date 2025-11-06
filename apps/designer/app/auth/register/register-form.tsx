"use client";

import { useRegisterMutation } from "@/queries/useAuth";
import { RegisterSchema, RegisterType } from "@/schema/auth.schema";
import { useRegisterStore } from "@/stores/useRegisterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Spinner } from "@workspace/ui/components/spinner";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";


type RegisterFormProps  = {
  onChangeRegisted: (value: boolean) => void;
}

export default function RegisterForm({ onChangeRegisted }: RegisterFormProps) {
  const registerMutation = useRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterType) => {
    if (registerMutation.isPending) return; 
    try {
      const result = await registerMutation.mutateAsync(data);
      console.log(result);
      // toast("Success", {
      //   description: "Please login to your account",
      // });
      useRegisterStore.getState().setEmail(data.email);
      onChangeRegisted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <form
        id="register-form"
        method="post"
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register to your account</h1>
          <p className="text-muted-foreground text-sm">
            Create an account to start chatting with your friends and family.
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
                {fieldState.invalid  && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {registerMutation.isError && (
                    <FieldError errors={[{message: registerMutation.isError ? "Tài khoản đã tồn tại" : ""}]} />
                  )}
              </Field>
            )}>
          </Controller>
        </FieldGroup>
        <Field>
          <Button type="submit" className="w-full">
            {registerMutation.isPending ? (
              <Spinner />
            ) : (
              <span>Register</span>
            )}
          </Button>
        </Field>
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              Login
            </Link>
          </p>
          <p className="text-muted-foreground text-sm text-balance">
            By registering, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
  );
}
