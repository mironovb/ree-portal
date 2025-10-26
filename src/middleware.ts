import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/admin") && !path.startsWith("/api/admin")) return;

  const creds = process.env.ADMIN_BASIC_AUTH;
  if (!creds) return NextResponse.json({ error: "ADMIN_BASIC_AUTH not set" }, { status: 500 });

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  const token = auth.split(" ")[1] ?? "";
  const [user, pass] = Buffer.from(token, "base64").toString("utf8").split(":");
  const [cfgUser, cfgPass] = creds.split(":");

  if (user !== cfgUser || pass !== cfgPass) {
    return new NextResponse("Forbidden", { status: 403 });
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
