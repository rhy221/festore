"use client"

import http from '@/lib/http';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter } from '@workspace/ui/components/card';
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


const page = () => {

    const params = useSearchParams();
    const token = params.get("token");
    const router = useRouter();

    if(!token)
      router.push("/auth/register");

    const verifyEmail = async() => {
      const response = await http.post(`/auth/verify`, {token: token});
      return response.data;
    }
    const verifyMutation = useMutation({
      mutationFn: verifyEmail,
    })

    const onClick = async () => {
      if(verifyMutation.isPending) return;
      try {
        const result = await verifyMutation.mutateAsync();
        console.log(result);
        router.push("/auth/login");
      } catch(error) {

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
            <Button onClick={onClick}>Verify</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page