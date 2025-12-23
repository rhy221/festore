
import AuthGuard from "@/components/AuthGuard";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
        {children}
    </AuthGuard>
    
  );
}
