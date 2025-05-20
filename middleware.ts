import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./app/lib/utils/utils.common";

const protectedPath = ["/backend"];
const ignoredPath = ["/", "/api/auth/login"];
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const base = req.nextUrl.origin;
  if (protectedPath.some((path) => url.startsWith(path))) {
    if (!(await verifyAccessToken(req))) return NextResponse.redirect(new URL("/login?t=登录过期", base));
  }
  // 放行GET请求和登录请求
  if (req.method === "GET" || ignoredPath.includes(url)) return NextResponse.next();
  // 剩下的请求均需要验证
  if (!(await verifyAccessToken(req))) return NextResponse.redirect(new URL("/login?t=登录过期", base));
  return NextResponse.next();
}
