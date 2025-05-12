"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAutoLogin = localStorage.getItem("autoLogin");
    if (!isAutoLogin) {
      router.replace("/login");
      return;
    }
  }, []);

  return <></>;
}
