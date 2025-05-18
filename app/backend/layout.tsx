"use client";

import { useEffect, useState } from "react";
import SideNav from "../ui/backend/side-nav";
import SideNavTrigger from "../ui/backend/side-nav-trigger";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    window.addEventListener("route-finished", handleRouteFinished);
    return () => {
      window.removeEventListener("route-finished", handleRouteFinished);
    };
  }, []);

  function handleRouteFinished() {
    setShowSideNav(false);
  }

  return (
    <div className="w-full min-h-full flex">
      <SideNavTrigger active={showSideNav} onClick={() => setShowSideNav(!showSideNav)} />
      <SideNav show={showSideNav} />
      <div className="flex-1 min-w-[300px] p-5 md:py-4 md:px-7 bg-white">{children}</div>
    </div>
  );
}
