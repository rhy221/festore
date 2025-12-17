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
import { Banknote, Box, ChartArea, CircleUser, House, LogOut, Search, ShoppingCart } from 'lucide-react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import { useRouter } from 'next/navigation'
import { isTokenExpired } from '@/lib/http'
import Image from 'next/image'
import { useCart } from '@/queries/useCart'
import { useAuthStore } from '@/stores/authStore'

const NavBar = () => {
    const router = useRouter();
    const authStore = useAuthStore()
    const {data: cart, isLoading: cartLoading} = useCart();

    const logOut = () => {
        authStore.logout();
        router.replace("/");
    };

  return (

    <nav className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-gray-200 px-8 py-6'>
        <div className='flex justify-between items-centerpx-8  transition-colors duration-300'>
        {/*Left*/}
        <div className='flex items-center basis-[700px] gap-4'>
            {/* Title */}
                <Link href='/' className='flex items-center gap-2 group'>
                    {/* Dark Mode: Invert logo to make it white if original is black */}
                    <Image 
                        src='/logo.svg' 
                        alt="logo" 
                        height={50} 
                        width={50}  
                        className='w-8 h-8 dark:invert transition-all'
                    />
                    <span className='text-xl font-bold tracking-tight text-foreground group-hover:text-ring transition-colors'>
                        HHCLOSET
                    </span>
                </Link>
        </div>
        
        {/* Right */}
        <div className='flex gap-6 items-center'>
            {/* Nav */}
            <div>
                <NavigationMenu>
                 <NavigationMenuList className="gap-1">        
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/gallery' className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-ring focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"> 
                                <span className='text-base'>Gallery</span> 
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/store' className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-ring focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                <span className='text-base'>Store</span>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href='/auction' className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-ring focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                <span className='text-base'>Auction</span>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </div>     

            <div>
                {/* Primary Button */}
                <Button asChild className="rounded-full px-6 font-bold" size="default">
                    <Link href="/upload">UPLOAD</Link>
                </Button>
            </div>
             {/*cart*/}
            <div>
                <Button variant="ghost" size="icon" asChild className="relative hover:bg-accent/50 rounded-full">
                    <Link href={"/cart"}>
                        <ShoppingCart className="w-5 h-5 text-foreground" />
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-background">
                            {(cartLoading || !cart?.items) ? 0 : cart.items.length}
                        </span>
                    </Link>
                </Button>
            </div>

            {/*Auth*/}
            <div className='flex items-center gap-2'>
                {!authStore.isAuthenticated ? (
                    <>
                    <Link href="/auth/login">
                        <Button variant={'ghost'} className="text-foreground hover:text-ring">Log In</Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button variant="outline" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground">Sign In</Button> 
                    </Link>
                    </>
                ) : (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-ring transition-all p-0">
                            <Avatar className="h-9 w-9 border border-border">
                                <AvatarImage src={authStore.user?.avatarUrl}/>
                                <AvatarFallback className="bg-muted text-muted-foreground">U</AvatarFallback>
                            </Avatar> 
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={8}  className='w-56 bg-card border-border text-card-foreground shadow-lg'>
                        <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                                <p className="font-medium text-sm">My Account</p>
                                <p className="w-[180px] truncate text-xs text-muted-foreground">Manage your session</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem asChild>
                            <Link href={`/portfolio/${authStore.user?.id}/infor`} className='cursor-pointer w-full flex items-center gap-2 group focus:bg-accent focus:text-accent-foreground'>
                                <CircleUser className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                                <span>Portfolio</span>
                            </Link> 
                        </DropdownMenuItem>
                      
                        <DropdownMenuItem asChild>
                            <Link href="/sales" className='cursor-pointer w-full flex items-center gap-2 group focus:bg-accent focus:text-accent-foreground'>
                                <ChartArea className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                                <span>Sales</span>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/models" className='cursor-pointer w-full flex items-center gap-2 group focus:bg-accent focus:text-accent-foreground'>
                                <Box className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                                <span>Models</span>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/purchase" className='cursor-pointer w-full flex items-center gap-2 group focus:bg-accent focus:text-accent-foreground'>
                                <Banknote className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                                <span>Purchase</span>
                            </Link> 
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-border" />
                          <DropdownMenuItem onClick={logOut} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                            <div className='flex w-full gap-2 items-center'>
                                <LogOut className="w-4 h-4" />
                                <span>Log out</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                )}
            </div>
        </div>
    </div>
    </nav>
  )
}

export default NavBar