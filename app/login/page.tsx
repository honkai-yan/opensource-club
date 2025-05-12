"use client";

import { getRandomImg } from "../lib/entry-bg-urls";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PasswordInput } from "@/components/PasswordInput";
import { useEffect, useRef } from "react";
import bcrypt from "bcryptjs";

const loginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "用户名长度应在2至10位之间" })
    .max(10, { message: "用户名长度应在2至10位之间" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "用户名只能包含字母、数字或下划线" }),
  password: z
    .string()
    .trim()
    .min(6, "密码长度应在6至32位之间")
    .max(32, "密码长度应在6至32位之间")
    .regex(/^[a-zA-Z0-9_\-@]+$/, "密码包含非法字符（只允许字母、数字、_、-、@）"),
});

export default function Login() {
  const randImg = useRef("");
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    randImg.current = getRandomImg();
  }, []);

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        password: await bcrypt.hash(values.password, 10),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      console.info(data);
    } else {
      console.error(data);
    }
  };

  return (
    <div className="w-full h-full p-[15px] flex justify-center items-center">
      {randImg.current && (
        <img
          src={randImg.current}
          alt="背景图片"
          className="w-full h-full object-cover fixed left-0 top-0 pointer-none"
        />
      )}
      <Card className="w-full h-fit relative max-w-[400px] backdrop-blur-md bg-white/70 gap-3">
        <CardHeader>
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>CDUESTC 开放原子开源社团</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Image src="/user.png" alt="用户名" width={20} height={20} />
                      用户名
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="用户名" {...field} className="border-black border-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Image src="/sq-password.png" alt="密码" width={20} height={20} />
                      密码
                    </FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="密码" {...field} className="border-black border-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-2">
                登录
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
