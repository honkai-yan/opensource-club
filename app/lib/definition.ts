import { z } from "zod";

export type User = {
  id: number;
  name: string;
  password: string | null;
  nick_name: string;
  avatar_src: string;
  sch_id: string;
  description: string;

  cur_point: number;
  total_point: number;

  join_date: string;
  delete_date: string | null;
  is_deleted: boolean;
};

export type Logindata = {
  username: string;
  password: string;
  captcha: string;
};

export const loginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "用户名长度应在2至10位之间" })
    .max(16, { message: "用户名长度应在2至10位之间" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "用户名只能包含字母、数字或下划线" }),
  password: z
    .string()
    .trim()
    .min(6, "密码长度应在6至32位之间")
    .max(32, "密码长度应在6至32位之间")
    .regex(/^[a-zA-Z0-9_\-@]+$/, "密码包含非法字符（只允许字母、数字、_、-、@）"),
  captcha: z
    .string()
    .min(4, "验证码长度为4位")
    .max(4, "验证码长度为4位")
    .regex(/^[a-zA-Z0-9]+$/, { message: "验证码只能包含字母或数字" }),
});
