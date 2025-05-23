import { NextRequest } from "next/server";
import { verifyJwt } from "./jwt";
import { User } from "../definition";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function throttle(fn: Function, delay: number): Function {
  let timer: NodeJS.Timeout | null = null;
  let last = 0;
  return (...args: any[]) => {
    const now = Date.now();
    last = now;
    if (now - last < delay) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        last = 0;
        fn.apply(null, args);
      }, delay);
    } else {
      last = 0;
      fn.apply(null, args);
    }
  };
}

export async function verifyAccessToken(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  if (!accessToken) return false;
  if (!(await verifyJwt(accessToken))) return false;
  return true;
}
