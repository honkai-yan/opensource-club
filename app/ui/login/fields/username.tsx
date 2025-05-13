import { Logindata } from "@/app/lib/definition";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

export default function Username<T>({ form }: { form: UseFormReturn<Logindata> }) {
  return (
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
  );
}
