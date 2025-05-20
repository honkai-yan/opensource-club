import { AccessTokenPayload, User } from "@/app/lib/definition";
import { serverInternalException } from "@/app/lib/exceptions";
import { queryUserById } from "@/app/lib/query";
import { verifyJwt } from "@/app/lib/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")!.value;
    const userInfo: AccessTokenPayload = (await verifyJwt(accessToken)) as any;
    const [user] = (await queryUserById(userInfo.userId)) as User[];
    return NextResponse.json(user);
  } catch (err) {
    return serverInternalException(err);
  }
}
