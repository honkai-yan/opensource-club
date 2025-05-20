import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { getCaptchaURL, loginURL } from "@/app/api/api";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Logindata } from "@/app/lib/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { appRequest } from "@/app/api/request";
import { useRouter } from "next/navigation";
import Username from "./fields/username";
import Password from "./fields/password";
import CaptchaField from "./fields/captcha-field";
import RememberAutoLogin from "./fields/remember-auto-login";
import { loginFormSchema } from "@/app/lib/definition";
import { toast } from "sonner";

type toastType = typeof toast;

export default function LoginForm({ toast, remember }: { toast: toastType; remember: boolean }) {
  const [isLogining, setIsLogining] = useState(false);
  const router = useRouter();
  const [captchaURL, setCaptchaURL] = useState(getCaptchaURL);

  function getCaptcha() {
    setCaptchaURL(() => `${getCaptchaURL}?t=${Date.now()}`);
  }

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
      logindata: {
        ...values,
        captcha: values.captcha.toLowerCase(),
      },
    });
    if (!res) {
      toast.error("登录失败：网络错误");
      setIsLogining(false);
      getCaptcha();
      return;
    }
    const data = await res.json();
    if (res.ok) {
      toast.success("登录成功", { duration: 3000 });
      setTimeout(() => {
        setIsLogining(false);
        router.replace("/backend");
      }, 500);
    } else {
      toast.error(`登录失败：${data.message}`);
      getCaptcha();
      setIsLogining(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Username form={form} />
          <Password form={form} />
          <CaptchaField form={form} captchaURL={captchaURL} getCaptcha={getCaptcha} />
          <RememberAutoLogin autoLogin={remember} />
          <Button type="submit" className="w-full mt-2" disabled={isLogining}>
            {isLogining && <Loader2 className="animate-spin" />}
            登录
          </Button>
        </form>
      </Form>
    </>
  );
}
