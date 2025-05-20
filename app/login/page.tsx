"use client";

import { getRandomImg } from "../lib/entry-bg-urls";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import LoginForm from "../ui/login/login-form";
import { Toaster, toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { appRequest } from "../api/request";
import { loginURL } from "../api/api";
import { useUserStore } from "../lib/store";

export default function Login() {
  const [randImg, setRandImg] = useState("");
  const searchParams = useSearchParams();
  const [autoLogin, setAutoLogin] = useState(false);
  const router = useRouter();
  const isAutoLogining = useRef(false);
  const { setUser } = useUserStore();

  useEffect(() => {
    setRandImg(getRandomImg());
    const t = searchParams.get("t");
    if (t) {
      toast.info("访问令牌过期或无效，请重新登录", { duration: 3000 });
    } else {
      const remember = Boolean(localStorage.getItem("remember"));
      setAutoLogin(remember);
      if (remember) {
        requestAutoLogin();
      }
    }
  }, []);

  async function requestAutoLogin() {
    if (isAutoLogining.current) return;
    isAutoLogining.current = true;
    const req = await appRequest(loginURL, { autoLogin: true });
    if (!req) {
      toast.error("登录失败，网络错误");
      isAutoLogining.current = false;
      return;
    }
    const data = await req.json();
    if (req.ok) {
      toast.success("登录成功");
      setUser(data.data);
      localStorage.setItem("user_base_info", JSON.stringify(data.data));
      setTimeout(() => {
        isAutoLogining.current = false;
        router.replace("/backend");
      }, 1000);
    } else {
      toast.error(`登录失败：${data.message}`);
      isAutoLogining.current = false;
    }
  }

  const bgImg = randImg && (
    <img src={randImg} alt="背景图片" className="w-full h-full object-cover fixed left-0 top-0 pointer-none" />
  );

  return (
    <div className="w-full h-full p-[15px] flex justify-center items-center">
      <Toaster position="top-center" richColors />
      {bgImg}
      <Card className="w-full h-fit relative max-w-[400px] backdrop-blur-md bg-white/70 gap-3">
        <CardHeader>
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>CDUESTC 开放原子开源社团</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm toast={toast} autoLogin={autoLogin} />
        </CardContent>
      </Card>
    </div>
  );
}
