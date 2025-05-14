import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { User } from "./definition";
import { getUserRoleIdById } from "./data";
import { NextResponse } from "next/server";

let jwtSecret: string = "";
let isInited = false;
export function initOnce() {
  if (isInited) return;
  isInited = true;
  // 检查jwt密钥
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT密钥不存在");
    process.exit(-1);
  }
}

const secret = new TextEncoder().encode(jwtSecret);

export function setCookie(res: NextResponse, name: string, content: any, age: number) {
  return res.cookies.set(name, content, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: age,
  });
}

export async function signJwt(payload: JWTPayload, expiresIn: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function signAccessToken(user: User) {
  try {
    return await signJwt(
      {
        userId: user.id,
        name: user.name,
        roleId: await getUserRoleIdById(user.id!),
        type: "access",
      },
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
