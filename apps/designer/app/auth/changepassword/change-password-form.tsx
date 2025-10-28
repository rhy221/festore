"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@workspace/ui/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useRouter, useSearchParams } from "next/navigation";
import { changePasswordSchema, ChangePasswordType } from "@/schema/auth.schema";
import { useChangePasswordMutation } from "@/queries/useAuth";


export default function ChangePasswordForm()
{

    const params = useSearchParams();
    const token = params.get("token");
    const router = useRouter();

    if(!token) 
        router.push("/auth/login");

    const form = useForm<ChangePasswordType>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        password: "",
        confirmPassword: ""
      },
      mode: "onChange",
    })

    const mutation = useChangePasswordMutation();

    const onSubmit = async (data: ChangePasswordType) => {
      if(mutation.isPending) return;
      try {
        const result = await mutation.mutateAsync({ token: token!, password: data.password});
        console.log(result);
        router.push("/auth/login");
      } catch(error) {
        console.log(error);
      }
    }
    return (
        <form
          id="register-form"
          method="post"
          className={cn("flex flex-col gap-6")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Forgot your password</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email to send reset password mail
            </p>
          </div>
          <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  New Password
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

        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Confirm Password
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
              Change Password
            </Button>
          </Field>
        </form> 
    );
}