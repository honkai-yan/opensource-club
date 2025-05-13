import { NextResponse } from "next/server";

// 服务器内部错误
export function serverInternalException(err: any, message?: string) {
  console.error(`处理请求失败：${err}`);
  return NextResponse.json({ message: message ?? "服务器炸了，请稍等再试" }, { status: 500 });
}

// 用户不存在
export function userNotExistException(message?: string) {
  return NextResponse.json({ message: message ?? "这个人似乎不存在..." }, { status: 404 });
}

// 用户名或密码错误
export function userNameOrPasswordException(message?: string) {
  return NextResponse.json({ message: message ?? "用户名或密码错误，都是进不去的哦" }, { status: 401 });
}
