'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import http from '@/lib/http';
import { cn } from '@workspace/ui/lib/utils';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { forgotPasswordBodySchema, ForgotPasswordBodyType } from '@/schemas/auth.schema';
import { useForgotPasswordMutation } from '@/queries/useAuth';
import { Spinner } from '@workspace/ui/components/spinner';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';


export default function ForgotPasswordForm() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const form = useForm<ForgotPasswordBodyType>({
        resolver: zodResolver(forgotPasswordBodySchema),
        defaultValues: {
            email: ""
        }
    })

    const mutation = useForgotPasswordMutation();


    const onSubmit = async (data: ForgotPasswordBodyType) => {
        if(mutation.isPending) return;
        try {
            const result = await mutation.mutateAsync(data);
            toast.success(`Change password email has been sent to your ${form.watch("email", "email")}`)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(authStore.isAuthenticated)
          router.replace("/")
      },[authStore]);

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
        
                <Field>
                  <Button type="submit" className="w-full">
                    {mutation.isPending ? (
              <Spinner />
            ) : (
              <span>Send Email</span>
            )}
                  </Button>
                </Field>

                <div className="flex flex-col gap-1 text-center text-sm">
          
          {/* <Link href="/auth/register" className="underline underline-offset-4">
            Back
          </Link> */}
        </div>
              </form>
    );
}