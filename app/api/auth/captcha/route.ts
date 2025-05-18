import { NextRequest, NextResponse } from "next/server";
import svgCaptcha from "@/app/lib/svg-captcha"; // 坑！
import bcrypt from "bcryptjs";
import { setCookie } from "@/app/lib/utils/utils.server";

export async function GET(req: NextRequest) {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: "o0i1",
    noise: 3,
    color: false,
    width: 80,
    height: 36,
    fontSize: 36,
  });

  const res = new NextResponse(captcha.data, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
  const encryptedCaptcha = await bcrypt.hash(captcha.text.toLowerCase(), 10);
  setCookie(res, "captcha", encryptedCaptcha, 60 * 5);
  return res;
}
