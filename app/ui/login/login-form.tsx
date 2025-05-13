import { PasswordInput } from "@/app/ui/login/fields/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Captcha from "./fields/captcha";
import { getCaptchaURL, loginURL } from "@/app/api/api";
import { useState } from "react";
import { z } from "zod";
import { Logindata, User } from "@/app/lib/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { appRequest } from "@/app/api/request";
import { useUesrdataStore } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Username from "./fields/username";
import Password from "./fields/password";
import CaptchaField from "./fields/captcha-field";
import RememberAutoLogin from "./fields/remember-auto-login";
import { loginFormSchema } from "@/app/lib/definition";

export default function LoginForm() {
  const [isLogining, setIsLogining] = useState(false);
  const userdataStore = useUesrdataStore();
  const router = useRouter();

  const form = useForm<Logindata>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLogining(true);
    const res = await appRequest(loginURL, {
      logindata: values,
    });
    if (!res) {
      toast.error("登录失败：网络错误");
      setIsLogining(false);
      return;
    }
    const data = await res.json();
    if (res.ok) {
      userdataStore.setState(data.data);
      toast.success("登录成功", { duration: 3000 });
      setTimeout(() => {
        setIsLogining(false);
        router.replace("/backend");
      }, 500);
    } else {
      toast.error(`登录失败：${data.message}`);
      setIsLogining(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Username form={form} />
          <Password form={form} />
          <CaptchaField form={form} />
          <RememberAutoLogin />
          <Button type="submit" className="w-full mt-2" disabled={isLogining}>
            {isLogining && <Loader2 className="animate-spin" />}
            登录
          </Button>
        </form>
      </Form>
    </>
  );
}
