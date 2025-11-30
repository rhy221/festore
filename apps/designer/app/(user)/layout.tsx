
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children, modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode
}) {
  return (
    <div className="flex flex-col relative">
        <NavBar />
        {children}
        {modal}
        <Toaster position="top-center"/>
    </div>
  );
}
