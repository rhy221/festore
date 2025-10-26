'use client';

import { useState } from 'react';
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


const forgotPasswordBodySchema = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
})

type ForgotPasswordBodyType = z.infer<typeof forgotPasswordBodySchema>;

const sendResetPassMail = async (body: ForgotPasswordBodyType) => {
    const response = await http.post("http://localhost:3003/auth/forgot-password", {...body, origin: process.env.NEXT_PUBLIC_URL + "/auth/changepassword"});
    return response;
}

export default function ForgotPasswordForm() {
    const router = useRouter();
    
    const form = useForm<ForgotPasswordBodyType>({
        resolver: zodResolver(forgotPasswordBodySchema),
        defaultValues: {
            email: ""
        }
    })

    const mutation = useMutation({
        mutationFn: sendResetPassMail,
    })


    const onSubmit = async (data: ForgotPasswordBodyType) => {
        if(mutation.isPending) return;
        try {
            const result = await mutation.mutateAsync(data);
            console.log(result);
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
                    Send Email
                  </Button>
                </Field>
              </form>
    );
}