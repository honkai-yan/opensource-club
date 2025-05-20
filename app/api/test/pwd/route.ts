import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "测试密码",
    data: await bcrypt.hash("123456", 10),
  });
}
