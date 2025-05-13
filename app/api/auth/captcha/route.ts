import { NextRequest, NextResponse } from "next/server";

function generateCaptchaText(length = 4) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET(req: NextRequest) {
  const text = generateCaptchaText().toLowerCase();

  req.cookies.set("captcha", text);
  // return new NextResponse(captcha, {
  //   headers: {
  //     "Content-Type": "image/svg+xml",
  //   },
  // });
  return new NextResponse("");
}
