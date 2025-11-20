"use client"
import React, { useEffect, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@workspace/ui/components/navigation-menu"
import Link from 'next/link'
import { Box, ChartArea, CircleUser, House, LogOut, Search, ShoppingCart } from 'lucide-react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import { useRouter } from 'next/navigation'
import { isTokenExpired } from '@/lib/http'
import Image from 'next/image'


const NavBar = () => {

    
    const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("accessToken");

    if (stored && !isTokenExpired(stored)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
    const logOut = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    router.replace("/");
  };


  return (
    <div className='flex justify-between items-center py-4 px-8 border-b-2 bg-white'>
        {/*Left*/}
        <div className='flex items-center basis-[700px] gap-4'>
            {/* Title */}
                <Link href='/' className='flex items-center gap-2'>
                    <Image src='/logo.svg' alt="logo" height={50} width={50}  className='w-8 h-8'/>
                    <span className='text-2xl font-bold'>HHCLOSET</span>
                </Link>
        </div>
        
        {/* Right */}
        <div className='flex gap-4 items-center'>
            {/* Nav */}
            <div>
                <NavigationMenu>
                 <NavigationMenuList>        
                     <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/gallery' > <span className='text-2xl'>Gallery</span> </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/store'><span className='text-2xl'>Store</span></Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/auction'><span className='text-2xl'>Auction</span></Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </div>     

            <div>
                <Button asChild>
  <Link href="/upload">Upload</Link>
</Button>
                
            </div>
             {/*cart*/}
            <div>
                <Button size={"icon-lg"}>
                    <ShoppingCart fill='white' stroke='white' />
                </Button>
            </div>

            {/*Auth*/}
            <div className='flex items-center gap-2'>
                {!isLoggedIn ? (
                    <><Link href="/auth/login">
                    <Button variant={'outline'}>Đăng nhập</Button>
                </Link>
                <Link href="/auth/register">
                     <Button>Đăng ký</Button> 

                </Link></>
                ) : (
<DropdownMenu >
                    <DropdownMenuTrigger>
                        <Avatar className="">
                        <AvatarImage src="https://picsum.photos/seed/picsum/200/300"/>
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar> 
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={6}  className='mr-8 w-52'>
                        <DropdownMenuItem>
                            <Link href="/profile" className='w-full'>
                               <div className='flex w-full gap-4'>
                                <CircleUser />
                                <span>Profile</span>
                            </div>
                            </Link> 
                        </DropdownMenuItem>
                      
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/dashboard" className='w-full'>
                               <div className='flex w-full gap-4'>
                                <ChartArea />
                                <span>Dashboard</span>
                            </div>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/products" className='w-full'>
                               <div className='flex w-full gap-4'>
                                <Box />
                                <span>Products</span>
                            </div>
                            </Link> 
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={logOut}>
                            <div className='flex w-full gap-4'>
                                <LogOut />
                                <span>Log out</span>
                            </div>
                                
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                )}
                
                
            </div>
        </div>
        
        
    </div>
   
  )
}

export default NavBar