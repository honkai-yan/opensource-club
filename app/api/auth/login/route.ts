import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/lib/connection";
import { Logindata, RefreshTokenPayload, User } from "@/app/lib/definition";
import bcrypt from "bcryptjs";
import {
  captchaExpiredException,
  incompleteInfoException,
  invalidCaptchaException,
  refreshTokenExpiredException,
  serverInternalException,
  userNameOrPasswordException,
  userNotExistException,
} from "@/app/lib/exceptions";
import { setCookie, signAccessToken, signRefreshToken } from "@/app/lib/utils/utils.server";
import { queryUserById, queryUsersByName } from "@/app/lib/query";
import { verifyJwt } from "@/app/lib/utils/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { logindata, autoLogin }: { logindata: Logindata; autoLogin: boolean } = body;
  if (autoLogin) return await handleAutoLogin(req);

  if (!logindata) {
    return incompleteInfoException();
  }
  const { username, password, captcha } = logindata;

  if (!username || !password || !captcha) {
    return incompleteInfoException("用户名、密码或验证码不能为空");
  }

  const clientCaptcha = req.cookies.get("captcha")?.value;
  if (!clientCaptcha) {
    return captchaExpiredException();
  } else if (!(await bcrypt.compare(captcha, clientCaptcha))) {
    return invalidCaptchaException();
  }

  try {
    const sql = `select * from users where sch_id = ?;`;
    const user = ((await query(sql, [username])) as User[])[0];
    if (user) {
      const isMatch = await bcrypt.compare(password!, user.password!);
      if (isMatch) {
        // 登录成功，返回登录信息，并签发jwt
        const [userData] = await queryUsersByName(user.name!);
        const res = NextResponse.json({ message: "登录成功", data: userData });
        setCookie(res, "access_token", await signAccessToken(user), 60 * 60);
        setCookie(res, "refresh_token", await signRefreshToken(user), 60 * 60 * 24 * 7);
        setCookie(res, "captcha", null, 0);
        return res;
      } else {
        return userNameOrPasswordException();
      }
    } else {
      return userNotExistException();
    }
  } catch (err) {
    return serverInternalException(`处理请求失败：${err}`);
  }
}

async function handleAutoLogin(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return refreshTokenExpiredException();
  }

  const user: RefreshTokenPayload = (await verifyJwt(refreshToken)) as any;

  if (!user) {
    return refreshTokenExpiredException();
  }

  const userData = await queryUserById(user.userId!);
  const res = NextResponse.json({ message: "登录成功", data: userData });
  setCookie(res, "access_token", await signAccessToken(userData), 60 * 60);
  setCookie(res, "refresh_token", await signRefreshToken(userData), 60 * 60 * 24 * 7);
  setCookie(res, "captcha", null, 0);
  return res;
}
