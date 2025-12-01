import Image from "next/image";

interface HeaderProps {
  role?: "admin" | "user";
  name?: string;
}

export default function Header({ role = "admin", name = "ABC" }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between h-[80px] bg-[#EFF6FF] shadow z-50">
      <div className="flex items-center space-x-3 pl-4">
        {/* <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        /> */}
        <span className="text-xl md:text-2xl font-extrabold">HHCLOSET</span>
      </div>
      <div className="truncate max-w-[50%] text-right pr-4">
        <span className="text-base md:text-xl font-black italic">
          Xin chào {role}: {name}
        </span>
      </div>
    </header>
  );
}
