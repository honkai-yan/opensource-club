import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/lib/connection";
import { Logindata, User } from "@/app/lib/definition";
import bcrypt from "bcryptjs";
import {
  serverInternalException,
  userNameOrPasswordException as usernameOrPasswordException,
  userNotExistException,
} from "@/app/lib/exceptions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { logindata }: { logindata: Logindata } = body;

  try {
    const sql = `select * from users where sch_id = ?;`;
    const users = ((await query(sql, [logindata.username])) as User[])[0];
    if (users) {
      const isMatch = await bcrypt.compare(logindata.password!, users.password!);
      if (isMatch) {
        return NextResponse.json({
          message: "登录成功",
          data: {
            ...users,
            password: "",
          },
        });
      } else {
        return usernameOrPasswordException();
      }
    } else {
      return userNotExistException();
    }
  } catch (err) {
    return serverInternalException(`处理请求失败：${err}`);
  }
}
