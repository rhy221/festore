"use client";
import { useSendVerifyEmailMutation } from '@/queries/useAuth';
import { useRegisterStore } from '@/stores/useRegisterStore';
import { Button } from '@workspace/ui/components/button';
import React from 'react'

export default function SendVerifyEmailForm() {
    const { email } = useRegisterStore();
    const mutation =  useSendVerifyEmailMutation();
    
    const onClick = async () => {
        if(mutation.isPending) return;
        try{
        const result = await mutation.mutateAsync({email: email});
        console.log(result);
         } catch (error) {
      console.log(error);
    }
    }
    return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold">Verify email has been sent to your <strong>{email}</strong></h2>
      <Button onClick={onClick}>
        Send Again
      </Button>
    </div>
  );
}