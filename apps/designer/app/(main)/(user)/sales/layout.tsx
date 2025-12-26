"use client"

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { usePathname } from "next/navigation";


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
    const path = usePathname()
    const currentTab = path.slice(path.lastIndexOf("/"), path.length);
  return (
    <div className="min-h-screen bg-zinc-950">
        <main className="container mx-auto px-16 py-12">
             <Tabs defaultValue={currentTab} className="w-full">
          <TabsList className="border-b border-zinc-800 bg-transparent h-auto p-0 rounded-none ">
            <TabsTrigger
              value="/sales"
              className="text-white/50 font-bold text-[1.2rem] data-[state=active]:text-white data-[state=active]:bg-transparent bg-transparent  border-0 rounded-none px-0 mr-8"
            >
                <Link href={"/sales"}>Sales</Link>
            </TabsTrigger>
            <TabsTrigger
              value="/analytics"
              className="text-white/50 font-bold text-[1.2rem] data-[state=active]:text-white data-[state=active]:bg-transparent bg-transparent  border-0 rounded-none px-0 mr-8"
            >
            <Link href={"/sales/analytics"}>Analytics</Link>

              
            </TabsTrigger>
          </TabsList>
          {children}
        </Tabs>
        </main>
       
        
    </div>
  );
}
