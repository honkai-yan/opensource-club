"use client";

import { Input } from "@/components/ui/input";
import { throttle } from "@/app/lib/utils/utils.common";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchMember() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("query") || "");

  function handleChange(val: string) {
    setSearchValue(val);
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set("query", val);
    } else {
      params.delete("query");
    }
    router.replace(`/backend?${params.toString()}`);
  }

  const _fn = throttle(handleChange, 400);

  return (
    <div className="flex items-center gap-1 mt-6 max-w-md">
      <Input placeholder="搜索社团成员" onChange={(e) => _fn(e.target.value)} />
    </div>
  );
}
