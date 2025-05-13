"use client";

import { getRandomImg } from "../lib/entry-bg-urls";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import LoginForm from "../ui/login/login-form";

export default function Login() {
  const [randImg, setRandImg] = useState("");

  useEffect(() => {
    setRandImg(getRandomImg());
  }, []);

  const bgImg = randImg && (
    <img src={randImg} alt="背景图片" className="w-full h-full object-cover fixed left-0 top-0 pointer-none" />
  );

  return (
    <div className="w-full h-full p-[15px] flex justify-center items-center">
      {bgImg}
      <Card className="w-full h-fit relative max-w-[400px] backdrop-blur-md bg-white/70 gap-3">
        <CardHeader>
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>CDUESTC 开放原子开源社团</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
