import { NextRequest } from "next/server";
import { query } from "@/app/lib/data";
import { User } from "@/app/definition/data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userdata } = body;

  const sql = `select * from users;`;
  const users = (await query(sql)) as User[];
  return new Response(JSON.stringify(users));
}
