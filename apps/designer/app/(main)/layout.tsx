
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ScrollToTop from "@/components/ScrollToTop";
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
        <ScrollToTop />
        <Footer />
    </div>
  );
}
