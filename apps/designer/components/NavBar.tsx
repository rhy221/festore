"use client"
import React from 'react'
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
import { CircleUser, House, LogOut, Search, ShoppingCart } from 'lucide-react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import { useRouter } from 'next/navigation'


const NavBar = () => {

    const router = useRouter();
    const logOut = () => {
        localStorage.removeItem("accessToken");
        router.replace("/");
    }
  return (
    <div className='flex justify-between items-center py-4 px-8 border-b-2 bg-white'>
        {/*Left*/}
        <div className='flex items-center basis-[700px] gap-4'>
            {/* Title */}
                <Link href='/' className='flex items-center gap-2'>
                    <img src='/logo.png' className='w-8 h-8'/>
                    <span className='text-2xl font-bold'>HHCLOSET</span>
                </Link>
        </div>
        
        {/* Right */}
        <div className='flex gap-4'>
            {/* Nav */}
            <div>
                <NavigationMenu>
                 <NavigationMenuList>        
                     <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/dashboard'>Dashboard</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/products'>Sản phẩm</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </div>     

            {/*Auth*/}
            <div className='flex items-center gap-2'>
                <DropdownMenu >
                    <DropdownMenuTrigger>
                        <Avatar className="">
                        <AvatarImage src="https://picsum.photos/seed/picsum/200/300"/>
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar> 
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={6}  className='mr-8 w-64'>
                        <DropdownMenuItem>
                            <Link href="/profile" className='w-full'>
                               <div className='flex w-full gap-4'>
                                <CircleUser />
                                <span>Profile</span>
                            </div>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logOut}>
                            <div className='flex w-full gap-4'>
                                <LogOut />
                                <span>Log out</span>
                            </div>
                                
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                
            </div>
        </div>
        
        
    </div>
   
  )
}

export default NavBar