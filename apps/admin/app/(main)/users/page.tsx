"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserListSection from "../../../components/user/UserListSection";
import UnlockRequestSection from "../../../components/user/UnlockRequestSection";

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-background">

      

        {/* MAIN */}
        <main className="flex-1 px-6 md:px-10 lg:px-20 ">
          <UserListSection />
          {/* <UnlockRequestSection /> */}
        </main>
      
    </div>
  );
}
