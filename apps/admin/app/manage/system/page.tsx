'use client';

import AdminRightsTables from "./table";

export default function AdminPage() {
  return (
    <div className="p-10">
      <AdminRightsTables onTogglePermission={(userId,key)=>{return true;}}/>
    </div>
  );
}