"use client"

import http from '@/libs/api-client';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter } from '@workspace/ui/components/card';
import { Spinner } from '@workspace/ui/components/spinner';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
export const dynamic = 'force-dynamic';

const VerifyEmailContent = () => {
    const params = useSearchParams();
    const token = params.get("token");
    const router = useRouter();
    const authStore = useAuthStore();

    
    useEffect(() => {
        if (!token) {
            router.push("/auth/register");
        }
    }, [token, router]);

    const verifyEmail = async () => {
        const response = await http.post<any>(`/auth/verify`, { token: token });
        return response.data;
    }

    const verifyMutation = useMutation({
        mutationFn: verifyEmail,
    })

    const onClick = async () => {
        if (verifyMutation.isPending || !token) return;
        try {
            const result = await verifyMutation.mutateAsync();
            if (result.accessToken) {
                authStore.login(result.user, result.accessToken);
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!token) return <Spinner />; 

    return (
        <div className='flex justify-center'>
            <Card className='mt-2'>
                <CardContent>
                    <p className='text-4xl'>Verify your email</p>
                </CardContent>
                <CardFooter>
                    <div className='flex justify-end w-full'>
                        <Button onClick={onClick} disabled={verifyMutation.isPending}>
                            {verifyMutation.isPending ? <Spinner /> : <span>Verify email</span>}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center mt-10">
                <Spinner /> 
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    )
}