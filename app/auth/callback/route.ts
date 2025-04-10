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
      console.log("User authenticated:", data.user.id)

      // Check if user exists in the users table
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (queryError && queryError.code !== "PGRST116") {
        // PGRST116 is "no rows returned"
        console.error("Error checking for existing user:", queryError)
      }

      // If user doesn't exist in the users table, create a record
      if (!existingUser) {
        console.log("Creating user record for:", data.user.id)

        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name || data.user.email?.split("@")[0] || "User",
          role: data.user.user_metadata.role || "volunteer",
          created_at: new Date().toISOString(),
        })

        if (insertError) {
          console.error("Error creating user record after OAuth:", insertError)
        } else {
          console.log("User record created successfully")
        }
      } else {
        console.log("User already exists in users table")
      }
    } else if (error) {
      console.error("Error exchanging code for session:", error)
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}

