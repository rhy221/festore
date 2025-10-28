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
import { House, Search, ShoppingCart } from 'lucide-react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'


const NavBar = () => {
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
                <Link href="/profile">
                   <Avatar className="">
                        <AvatarImage src="/pathetic.jpg"/>
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar> 
                </Link> 
                
            </div>
        </div>
        
        
    </div>
   
  )
}

export default NavBar