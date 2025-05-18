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

// 信息不完整
export function incompleteInfoException(message?: string) {
  return NextResponse.json({ message: message ?? "提供的信息不完整" }, { status: 400 });
}

// 客户端验证码非法
export function invalidCaptchaException(message?: string) {
  return NextResponse.json({ message: message ?? "验证码错了是进不去的哦" }, { status: 400 });
}

// 验证码过期
export function captchaExpiredException(message?: string) {
  return NextResponse.json({ message: message ?? "验证码已过期" }, { status: 400 });
}

// 访问Token过期
export function accessTokenExpiredException(message?: string) {
  return NextResponse.json({ message: message ?? "访问令牌已过期" }, { status: 401 });
}
