import { NextRequest } from "next/server";
import { verifyJwt } from "./jwt";

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

export const getLocalStorage = <T>(key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (_) {
    return null;
  }
};
