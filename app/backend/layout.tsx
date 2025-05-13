"use client";

import { useState } from "react";
import SideNav from "../ui/backend/side-nav";
import SideNavTrigger from "../ui/backend/side-nav-trigger";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div className="w-screen h-screen flex">
      <SideNavTrigger active={showSideNav} onClick={() => setShowSideNav(!showSideNav)} />
      <SideNav show={showSideNav} />
      <div className="w-full h-screen bg-gray-100 md:p-[30px]">{children}</div>
    </div>
  );
}
