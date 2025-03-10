import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any file types like .svg, .png, .jpg, .jpeg, .gif, .webp
     * - Do not match for `/` as it's for login
     * - Do not match for `/dashboard` since it's protected by authentication logic
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|^/dashboard$|^/$).*)",
  ],
};
