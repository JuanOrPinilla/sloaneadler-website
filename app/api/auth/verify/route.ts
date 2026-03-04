import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

const passwordSchema = z.object({
  password: z.string().min(1),
});

// Default password for all sites
const DEFAULT_PASSWORD = "password123!";

function verifyPassword(input: string): boolean {
  // Check env var first, fallback to default
  const expectedPassword = process.env.SITE_PASSWORD || DEFAULT_PASSWORD;
  return input === expectedPassword;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = passwordSchema.parse(body);

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const cookieStore = cookies();
    cookieStore.set("site_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
