import { NextResponse } from "next/server";
import crypto from "crypto";
import { createUser, getUserByUsername } from "@/lib/auth-store";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  if (getUserByUsername(username)) {
    return NextResponse.json({ error: "Username already taken" }, { status: 409 });
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto.scryptSync(password, salt, 64).toString("hex");
  const user = createUser(username, passwordHash, salt);

  return NextResponse.json({
    user: { id: user.id, name: user.name, username: user.username },
  });
}
