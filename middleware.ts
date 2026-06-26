import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const allowed = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // IMPORTANT
};