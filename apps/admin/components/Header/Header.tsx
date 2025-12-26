"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@workspace/ui/components/dropdown-menu'
import { KeyRound, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import authAction from "@/api/auth.api";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

interface HeaderProps {
  role?: "admin" | "user";
  name?: string;
}

export default function Header({ role = "admin", name = "ABC" }: HeaderProps) {
  
  const authStore = useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: authAction.forgotPassword,
  })
  const logOut = () => {
        authStore.logout();
        router.replace("/");
    };
  const onChangePassword = async () => {
         if(mutation.isPending) return;
         try {
             
             const result = await mutation.mutateAsync({email: authStore.user?.email || ''});
             toast.success(`Change password email has been sent to your ${authStore.user?.email}`)
         } catch(error) {
             console.error(error);
         }
     }
  return (
    <header
      className="
        flex h-16 md:h-20 w-full items-center
        bg-card/90 backdrop-blur-md border-b border-border
      "
    >
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        <Link href='/' className='flex items-center gap-2 group shrink-0'>
                <Image 
                    src='/logo.svg' 
                    alt="logo" 
                    height={32} 
                    width={32}  
                    className='w-8 h-8 dark:invert transition-all'
                />
                <span className='text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-ring transition-colors'>
                    HHCLOSET
                </span>
            </Link>
        <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-primary transition-all p-0">
                            <Avatar className="h-9 w-9 border border-border">
                                <AvatarImage src={authStore.user?.avatarUrl}/>
                                <AvatarFallback className="bg-muted">
                                  <User/>
                                </AvatarFallback>
                            </Avatar> 
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='w-56'>
                        {/* ... (Keep existing dropdown content) ... */}
                        <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                                <p className="font-medium text-sm">{authStore.user?.name || 'User'}</p>
                                <p className="w-[180px] truncate text-xs text-muted-foreground">{authStore.user?.email}</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onChangePassword} className='cursor-pointer w-full flex items-center gap-2'>
                            <KeyRound className="w-4 h-4 mr-2" /> Change password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logOut} className="cursor-pointer text-destructive focus:text-destructive">
                            <LogOut className="w-4 h-4 mr-2" /> Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
      </div>
    </header>
  );
}
