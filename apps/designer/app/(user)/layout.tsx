
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
        <NavBar />
        {children}
    </div>
  );
}
