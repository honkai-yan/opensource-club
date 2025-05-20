import { AccessTokenPayload, User } from "../definition";
import { NextRequest, NextResponse } from "next/server";
import { signJwt, verifyJwt } from "./jwt";
import { queryUserRoleIdById } from "../query";

export function setCookie(res: NextResponse, name: string, content: any, age: number) {
  return res.cookies.set(name, content, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: age,
  });
}

export async function signAccessToken(user: User) {
  try {
    const payload: AccessTokenPayload = {
        userId: user.id!,
        username: user.name!,
        roleId: await queryUserRoleIdById(user.id!),
        type: "access",
      }
    return await signJwt(
      payload as any,
      "1h"
    );
  } catch (err) {
    console.error(`签发访问令牌失败: ${err}`);
    return null;
  }
}

export async function signRefreshToken(user: User) {
  try {
    return await signJwt(
      {
        userId: user.id,
        type: "refresh",
      },
      "7d"
    );
  } catch (err) {
    console.error(`签发刷新令牌失败: ${err}`);
    return null;
  }
}
