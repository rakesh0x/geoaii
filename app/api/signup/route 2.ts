import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const params = new URLSearchParams({ username, password });

  try {
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: params.toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = await res.json();

    if (res.ok && data?.data) {
      return NextResponse.json({ user: data.data });
    }

    return NextResponse.json(
      { error: data?.message || data?.detail || "Signup failed" },
      { status: res.status }
    );
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
