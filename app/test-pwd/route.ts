import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return [hashedPassword, salt];
}

export async function GET() {
  return Response.json({
    message: await hashPassword("123456"),
  });
}
