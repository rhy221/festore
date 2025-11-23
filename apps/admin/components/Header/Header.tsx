import Image from "next/image";

interface HeaderProps {
  role?: "admin" | "user";
  name?: string;
}

export default function Header({ role = "admin", name = "ABC" }: HeaderProps) {
  return (
    <header className="sticky top-0 w-full flex items-center justify-between h-20 bg-[#EFF6FF] shadow z-50">
      <div className="flex items-center space-x-3 pl-6">
        <Image
          src="/logo.png"
          alt="Profile"
          width={60}
          height={60}
          className="w-12 h-12 md:w-16 md:h-16"
        />
        <span className="text-lg sm:text-xl md:text-2xl font-extrabold">
          HHCLOSET
        </span>
      </div>
      <div className="truncate max-w-[52%] text-right">
        <span className="text-sm sm:text-base md:text-lg font-black italic pr-6">
          Xin chào {role}: {name}
        </span>
      </div>
    </header>
  );
}
