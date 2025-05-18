"use client";

import clsx from "clsx";
import { Users, Boxes, UserRound, Receipt } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavItem } from "@/app/lib/definition";
import NavLink from "./nav-link";

const sideNavs: NavItem[] = [
  {
    name: "成员",
    icon: <Users strokeWidth={1.5} />,
    href: "/backend",
  },
  {
    name: "小组",
    icon: <Boxes strokeWidth={1} />,
    href: "/backend/groups",
  },
  {
    name: "积分兑换",
    icon: <Receipt strokeWidth={1.5} />,
    href: "/backend/shop",
  },
  {
    name: "我的",
    icon: <UserRound strokeWidth={1.5} />,
    href: "/backend/my",
  },
];

export default function SideNav({ show }: { show: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [clickedLink, setClickedLink] = useState("");

  useEffect(() => {
    setClickedLink(pathname);
    window.addEventListener("route-finished", handleRouteFinished);
    return () => {
      window.removeEventListener("route-finished", handleRouteFinished);
    };
  }, []);

  const handleRouteFinished = () => {
    setClickedLink("");
  };

  const handleClickLink = (href: string) => {
    if (pathname === href) return;
    setClickedLink(href);
    router.replace(href);
  };

  return (
    <div
      className={clsx({
        "w-full min-h-full p-4 bg-white/40 backdrop-blur-sm flex flex-col gap-1 items-center fixed left-0 top-0 z-10 duration-300 md:w-[250px] md:bg-white md:static md:translate-x-0 md:border-r-1 shrink-0":
          true,
        "translate-x-[100%]": !show,
      })}
    >
      <div className="w-full h-fit mb-2 flex justify-center items-center relative">
        <img src="/logo.png" className="w-full max-w-[150px] object-contain" />
      </div>

      <ul className="w-full flex-1 flex flex-col gap-2 items-center mt-4 px-2 md:px-1">
        {sideNavs.map((item) => (
          <li key={item.name} className="w-[70%] md:w-full">
            <NavLink navdata={item} onClick={handleClickLink} isRouting={clickedLink === item.href} />
          </li>
        ))}
      </ul>
    </div>
  );
}
