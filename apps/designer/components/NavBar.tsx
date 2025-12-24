"use client"
import React, { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu"
import Link from 'next/link'
import { 
  Banknote, 
  Box, 
  Boxes, 
  ChartArea, 
  CircleUser, 
  Codesandbox, 
  Key, 
  KeyRound, 
  LogOut, 
  Menu, 
  ShoppingCart, 
  X 
} from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@workspace/ui/components/dropdown-menu'
import { useRouter, usePathname } from 'next/navigation' // Import usePathname
import Image from 'next/image'
import { useCart } from '@/queries/useCart'
import { useAuthStore } from '@/stores/authStore'
import NotificationBell from './Notification'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet' // Import Sheet cho mobile menu
import { cn } from '@workspace/ui/lib/utils' // Utility for merging classes
import { useForgotPasswordMutation } from '@/queries/useAuth'
import toast from 'react-hot-toast'

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname(); // Lấy đường dẫn hiện tại
    const authStore = useAuthStore()
    const {data: cart, isLoading: cartLoading} = useCart();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const logOut = () => {
        authStore.logout();
        router.replace("/");
    };

    const mutation = useForgotPasswordMutation();
    
    
        const onChangePassword = async () => {
            if(mutation.isPending) return;
            try {
                
                const result = await mutation.mutateAsync({email: authStore.user?.email || ''});
                toast.success(`Change password email has been sent to your ${authStore.user?.email}`)
            } catch(error) {
                console.error(error);
            }
        }

    // Helper function để check active link
    const isActive = (path: string) => pathname === path;

    // Nav Items config để dễ quản lý và render
    const navItems = [
        { href: '/gallery', label: 'Gallery' },
        { href: '/store', label: 'Store' },
        { href: '/auction', label: 'Auction' },
    ];

  return (
    <nav className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-4 transition-colors duration-300'>
        <div className='flex justify-between items-center '>
        
        {/* --- LEFT SECTION --- */}
        <div className='flex items-center gap-8'>
            {/* Logo */}
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

            {/* Desktop Navigation (Hidden on mobile) */}
            <div className="hidden md:block">
                <NavigationMenu>
                 <NavigationMenuList className="gap-2">        
                      {navItems.map((item) => (
                        <NavigationMenuItem key={item.href}>
                            
                                <NavigationMenuLink 
                                    className={cn(
                                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                                        isActive(item.href) && "bg-accent text-accent-foreground font-bold" // Highlight active
                                    )}
                                asChild> 
                                <Link href={item.href}>{item.label}</Link>
                                </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                 </NavigationMenuList>
                </NavigationMenu>
            </div> 
        </div>
        
        {/* --- RIGHT SECTION --- */}
        <div className='flex gap-3 md:gap-6 items-center'>
            

            {/* Upload Button (Desktop only) */}
             { authStore.isAuthenticated &&
             <Button asChild className="hidden md:inline-flex rounded-full px-6 font-bold" size="default">
                <Link href="/upload">UPLOAD</Link>
            </Button>}
            
            
            {/* Notification */}
            { authStore.isAuthenticated && <NotificationBell/>}

            {/* Cart */}
            {authStore.isAuthenticated && 
            <Button variant="ghost" size="icon" asChild className="relative hover:bg-accent/50 rounded-full">
                <Link href={"/cart"}>
                    <ShoppingCart className="w-5 h-5 text-foreground" />
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-background">
                        {(cartLoading || !cart?.items) ? 0 : cart.items.length}
                    </span>
                </Link>
            </Button>
            }
            

            {/* Auth Dropdown (User Menu) */}
            <div className='hidden md:block'>
                {!authStore.isAuthenticated ? (
                    <div className='flex gap-2'>
                        <Link href="/auth/login">
                            <Button variant="outline">Log In</Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button >Sign Up</Button> 
                        </Link>
                    </div>
                ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-primary transition-all p-0">
                            <Avatar className="h-9 w-9 border border-border">
                                <AvatarImage src={authStore.user?.avatarUrl}/>
                                <AvatarFallback className="bg-muted">U</AvatarFallback>
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
                        <DropdownMenuItem asChild>
                            <Link href={`/portfolio/${authStore.user?.id}/infor`} className='cursor-pointer w-full flex items-center gap-2'>
                                <CircleUser className="w-4 h-4" /> <span>Portfolio</span>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/sales" className='cursor-pointer w-full flex items-center gap-2'>
                                <ChartArea className="w-4 h-4" /> <span>Sales</span>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/models" className='cursor-pointer w-full flex items-center gap-2'>
                                <Box className="w-4 h-4" /> <span>Models</span>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/purchase" className='cursor-pointer w-full flex items-center gap-2'>
                                <Boxes className="w-4 h-4" /> <span>Purchases</span>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/orders" className='cursor-pointer w-full flex items-center gap-2'>
                                <Banknote className="w-4 h-4" /> <span>Orders</span>
                            </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onChangePassword} className='cursor-pointer w-full flex items-center gap-2'>
                            <KeyRound className="w-4 h-4 mr-2" /> Change password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logOut} className="cursor-pointer text-destructive focus:text-destructive">
                            <LogOut className="w-4 h-4 mr-2" /> Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                )}
            </div>

            {/* --- MOBILE MENU (Hamburger) --- */}
            <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Mobile Navigation Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6 mt-6">
                            {/* Mobile Nav Links */}
                            <div className="flex flex-col space-y-3">
                                {navItems.map((item) => (
                                    <Link 
                                        key={item.href} 
                                        href={item.href}
                                        onClick={() => setIsSheetOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            isActive(item.href) ? "text-primary font-bold" : "text-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                 { authStore.isAuthenticated && 
                                 <Link 
                                    href="/upload" 
                                    onClick={() => setIsSheetOpen(false)}
                                    className="text-lg font-medium text-primary hover:underline"
                                >
                                    Upload Design
                                </Link>}
                                
                            </div>

                            <DropdownMenuSeparator />

                            {/* Mobile Auth Section */}
                            {!authStore.isAuthenticated ? (
                                <div className="flex flex-col gap-3">
                                    <Link href="/auth/login" onClick={() => setIsSheetOpen(false)}>
                                        <Button className="w-full" variant="outline">Log In</Button>
                                    </Link>
                                    <Link href="/auth/register" onClick={() => setIsSheetOpen(false)}>
                                        <Button className="w-full">Sign Up</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={authStore.user?.avatarUrl}/>
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{authStore.user?.name}</p>
                                            <p className="text-xs text-muted-foreground">{authStore.user?.email}</p>
                                        </div>
                                    </div>
                                                                <DropdownMenuSeparator />

                                    <div className="flex flex-col space-y-2 pl-2">
                                        <Link href={`/portfolio/${authStore.user?.id}/infor`} onClick={() => setIsSheetOpen(false)} className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                                            <CircleUser className="w-4 h-4" /> Portfolio
                                        </Link>
                                        <Link href="/sales" onClick={() => setIsSheetOpen(false)} className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                                            <ChartArea className="w-4 h-4" /> Sales
                                        </Link>
                                        <Link href="/models" onClick={() => setIsSheetOpen(false)} className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                                            <Box className="w-4 h-4" /> Models
                                        </Link>
                                        <Link href="/purchase" onClick={() => setIsSheetOpen(false)} className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                                            <Boxes className="w-4 h-4" /> Purchases
                                        </Link>
                                        <Link href="/orders" onClick={() => setIsSheetOpen(false)} className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                                            <Banknote className="w-4 h-4" /> Orders
                                        </Link>
                                                                    <DropdownMenuSeparator />

                                        <button onClick={() => {onChangePassword(); setIsSheetOpen(false)}} className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                                            <KeyRound className="w-4 h-4" /> Change password
                                        </button>
                                        <button onClick={() => {logOut(); setIsSheetOpen(false)}} className="flex items-center gap-2 py-2 text-sm text-destructive hover:underline text-left">
                                            <LogOut className="w-4 h-4" /> Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

        </div>
    </div>
    </nav>
  )
}

export default NavBar