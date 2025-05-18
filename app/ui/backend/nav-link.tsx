"use client";

import { NavItem } from "@/app/lib/definition";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  navdata,
  onClick,
  isRouting = false,
}: {
  navdata: NavItem;
  onClick?: Function;
  isRouting?: boolean;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={navdata.href}
      className={clsx({
        "w-full px-4 py-2 flex items-center gap-3 rounded-sm hover:bg-blue-500/10": true,
        "bg-blue-500/10 hover:bg-blue-500/10 outline-2 outline-blue-500 text-blue-500": navdata.href === pathname,
      })}
      onClick={() => onClick?.(navdata.href)}
      replace
    >
      {navdata.icon}
      <div className="flex flex-1 justify-between items-center">
        <span className="flex-1">{navdata.name}</span>
        <Loader2
          className={clsx({
            "ml-0 size-[16px] animate-spin duration-100": true,
            "opacity-0": !isRouting,
          })}
        />
      </div>
    </Link>
  );
}
