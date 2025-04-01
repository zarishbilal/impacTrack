import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.user) {
      // Check if user exists in the users table
      const { data: existingUser } = await supabase.from("users").select("*").eq("id", data.user.id).single()

      // If user doesn't exist in the users table, create a record
      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata.name || data.user.email?.split("@")[0] || "User",
          role: data.user.user_metadata.role || "volunteer",
          created_at: new Date().toISOString(),
        })

        if (insertError) {
          console.error("Error creating user record after OAuth:", insertError)
        }
      }
    }
  }

  // Check if there's a redirect parameter
  const redirectTo = requestUrl.searchParams.get("redirectTo") || requestUrl.origin

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(redirectTo)
}

