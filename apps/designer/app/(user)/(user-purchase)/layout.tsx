
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950">
        <main className="container mx-auto px-40 py-12">
             <Tabs defaultValue="mycart" className="w-full">
          <TabsList className="border-b border-zinc-800 bg-transparent h-auto p-0 rounded-none ">
            <TabsTrigger
              value="/cart"
              className="text-white/50 font-bold text-[1.2rem] data-[state=active]:text-white data-[state=active]:bg-transparent bg-transparent  border-0 rounded-none px-0 mr-8"
            >
                <Link href={"/cart"}>CART</Link>
            </TabsTrigger>
            <TabsTrigger
              value="/purchase"
              className="text-white/50 font-bold text-[1.2rem] data-[state=active]:text-white data-[state=active]:bg-transparent bg-transparent  border-0 rounded-none px-0 mr-8"
            >
            <Link href={"/purchase"}>PURCHASE</Link>

              
            </TabsTrigger>
            {/* <TabsTrigger
              value="invoice"
              className="text-white/50 font-bold text-[1.2rem] data-[state=active]:text-white data-[state=active]:bg-transparent   border-0 rounded-none px-0"
            >
              INVOICE
            </TabsTrigger> */}
          </TabsList>
          {children}
        </Tabs>
        </main>
       
        
    </div>
  );
}
