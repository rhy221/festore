"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserListSection from "./UserListSection";
import UnlockRequestSection from "./UnlockRequestSection";

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-20 h-16 md:h-20 bg-card border-b border-border">
        <Header role="admin" name="ABC" />
      </header>

      {/* LAYOUT */}
      <div className="flex pt-16 md:pt-20">
        {/* SIDEBAR */}
        <aside className="hidden md:block fixed left-0 top-16 md:top-20 h-[calc(100vh-5rem)] w-60">
          <Sidebar />
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 md:ml-60 space-y-6">
          <UserListSection />
          <UnlockRequestSection />
        </main>
      </div>
    </div>
  );
}
