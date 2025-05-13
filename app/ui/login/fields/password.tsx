import { Logindata } from "@/app/lib/definition";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { PasswordInput } from "./password-input";
import Image from "next/image";

export default function Password({ form }: { form: UseFormReturn<Logindata> }) {
  return (
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
  );
}
