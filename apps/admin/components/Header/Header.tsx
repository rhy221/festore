"use client";

interface HeaderProps {
  role?: "admin" | "user";
  name?: string;
}

export default function Header({ role = "admin", name = "ABC" }: HeaderProps) {
  return (
    <header
      className="
        fixed top-0 left-0 z-50 flex h-16 md:h-20 w-full items-center
        bg-card/90 backdrop-blur-md border-b border-border
      "
    >
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        <span className="text-lg md:text-xl font-bold tracking-wide text-foreground">
          HHCLOSET
        </span>

      </div>
    </header>
  );
}
