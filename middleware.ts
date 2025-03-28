import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the request is for the organization registration page
  if (req.nextUrl.pathname === "/organizations/register" && !session) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // Check if the request is for a protected route
  if (req.nextUrl.pathname.startsWith("/profile") && !session) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // Check if the request is for the organization dashboard
  if (req.nextUrl.pathname.startsWith("/organizations/dashboard") && !session) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/profile/:path*", "/organizations/register", "/organizations/dashboard/:path*"],
}

