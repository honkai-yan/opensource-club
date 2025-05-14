import { Logindata } from "@/app/lib/definition";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import Captcha from "./captcha";
import Image from "next/image";

export default function CaptchaField({
  form,
  captchaURL,
  getCaptcha,
}: {
  form: UseFormReturn<Logindata>;
  captchaURL: string;
  getCaptcha: Function;
}) {
  return (
    <FormField
      control={form.control}
      name="captcha"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <Image src="/captcha.png" alt="验证码" width={20} height={20} />
            验证码
          </FormLabel>
          <FormControl>
            <Captcha url={captchaURL} {...field} onClick={getCaptcha} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
