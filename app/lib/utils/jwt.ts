import { JWTPayload, SignJWT, jwtVerify } from "jose";

// 检查jwt密钥
const jwtSecret = process.env.JWT_SECRET;
let jwt = true;
if (!jwtSecret) {
  jwt = false;
  console.error("JWT密钥不存在");
}

const secret = new TextEncoder().encode(jwtSecret);

export async function signJwt(payload: JWTPayload, expiresIn: string | number) {
  if (!jwt) {
    return null;
  }
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
