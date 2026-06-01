import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUserByUsername } from "@/lib/auth-store";

export async function POST(request: Request) {
  const text = await request.text();
  const params = new URLSearchParams(text);
  const username = params.get("username") || "";
  const password = params.get("password") || "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required" }, { status: 400 });
  }

  const user = getUserByUsername(username);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const hash = crypto.scryptSync(password, user.salt, 64).toString("hex");
  if (hash !== user.passwordHash) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({
    data: { id: user.id, name: user.name, username: user.username },
  });
}
