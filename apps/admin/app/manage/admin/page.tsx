"use client";
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar'; 
import AdministratorManagement from "./AdministratorManagement";
const SIDEBAR_WIDTH = '240px'; 
const HEADER_HEIGHT = '80px'; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md" style={{ height: HEADER_HEIGHT }}>
        <Header role="admin" name="ABC" /> 
      </div>

      <Sidebar />

      <main className="flex-grow p-6" style={{ paddingTop: HEADER_HEIGHT, marginLeft: SIDEBAR_WIDTH }}>
        <AdministratorManagement />
      </main>
    </div>
  );
}
