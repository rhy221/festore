// src/pages/admin/AdminUsersPage.tsx

import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

import UserListSection from "@/app/users/UserListSection";
import UnlockRequestSection from "@/app/users/UnlockRequestSection";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 80;

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full bg-white shadow-lg"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 ml-0" style={{ marginLeft: SIDEBAR_WIDTH }}>
        {/* HEADER */}
        <div
          className="fixed top-0 right-0 z-20 bg-white shadow-md"
          style={{ height: HEADER_HEIGHT, left: SIDEBAR_WIDTH }}
        >
          <Header role="admin" name="ABC" />
        </div>

        {/* PAGE CONTENT */}
        <main className="p-6 mt-6" style={{ marginTop: HEADER_HEIGHT }}>
          <UserListSection />
          <UnlockRequestSection />
        </main>
      </div>
    </div>
  );
}