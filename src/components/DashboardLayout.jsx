import React from "react";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex items-start">
      <div className="w-[20vw]">sidebar</div>
      <div className="flex-1">
        <DashboardNavbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
