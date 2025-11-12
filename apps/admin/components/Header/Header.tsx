import Image from "next/image";

interface HeaderProps {
  role?: "admin" | "user";
  name?: string;
}

export default function Header({ role = "admin", name = "ABC" }: HeaderProps) {
  return (
    <header className="position: fixed top-0 left-0 w-full flex items-center justify-between h-32 bg-[#EFF6FF] shadow z-50">
      <div className="flex items-center space-x-4 pl-7">
        <Image
          src="/logo.png"
          alt="Profile"
          width={80}
          height={80}
          className="w-16 h-16 md:w-[127px] md:h-[127px]"
        />
        <span className="text-2xl sm:text-3xl md:text-[44px] font-extrabold">HHCLOSET</span>
      </div>
      <div className="truncate max-w-[52%] text-right">
        <span className="text-xl sm:text-2xl md:text-4xl font-black italic pr-32">
          Xin chào {role}: {name}
          </span>
      </div>
    </header>
  );
}