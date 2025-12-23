interface HeaderProps {
  role?: "admin" | "user";
  name?: string;
}

export default function Header({ role = "admin", name = "ABC" }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 z-50 flex h-[72px] w-full items-center 
                 bg-white/90 backdrop-blur-md border-b border-gray-200"
    >
    <div className="pl-5">
      <span className="text-xl font-bold tracking-wide text-gray-900">
        HHCLOSET
      </span>
    </div>
    </header>
  );
}
