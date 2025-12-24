"use client"

import http from '@/lib/http';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter } from '@workspace/ui/components/card';
import { Spinner } from '@workspace/ui/components/spinner';
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type VerifyEmailResType = {
  user: {
    id: string,
    name: string,
    email: string,
    avatarUrl: string,
  //   bio: string,
  //   status: "active" | "banned"
  //   createdAt: string,
  },
  accessToken: string,
  refreshToken?: string,
}

const page = () => {

    const params = useSearchParams();
    const token = params.get("token");
    const router = useRouter();
    const authStore = useAuthStore();

    if(!token)
      router.push("/auth/register");

    const verifyEmail = async() => {
      const response = await http.post<VerifyEmailResType>(`/auth/verify`, {token: token});
      return response.data;
    }
    const verifyMutation = useMutation({
      mutationFn: verifyEmail,
    })

    const onClick = async () => {
      if(verifyMutation.isPending) return;
      try {
        const result = await verifyMutation.mutateAsync();
        if(result.accessToken) {

        authStore.login(result.user ,result.accessToken);
        router.push("/");

      }
      } catch(error) {
        console.log(error); 
      }
    }
  return (
    <div className='flex justify-center'>
      <Card className='mt-2'>
        <CardContent>
          <p className='text-4xl'>Verify your email</p>
        </CardContent>
        <CardFooter>
          <div className='flex justify-end w-full'>
            <Button onClick={onClick}>
              {verifyMutation.isPending ? (
              <Spinner />
            ) : (
              <span>Verify email</span>
            )}</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page