
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function RootLayout({
  children, modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
        <NavBar />
        {children}
        {modal}
    </div>
  );
}
