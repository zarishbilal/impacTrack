import { NextResponse } from "next/server"
import supabase from "@/lib/supabase"

export async function POST() {
  try {
    // Get all users from the auth.users table (built-in Supabase auth)
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      console.error("Error fetching auth users:", authError)
      return NextResponse.json({ error: "Failed to fetch auth users", details: authError.message }, { status: 500 })
    }

    // Get all users from our custom users table
    const { data: customUsers, error: customError } = await supabase.from("users").select("*")

    if (customError) {
      console.error("Error fetching custom users:", customError)
      return NextResponse.json({ error: "Failed to fetch custom users", details: customError.message }, { status: 500 })
    }

    // Find users that exist in auth but not in our custom table
    const missingUsers = authUsers.users.filter(
      (authUser) => !customUsers?.some((customUser) => customUser.id === authUser.id),
    )

    // Insert missing users into our custom table
    const results = []
    for (const user of missingUsers) {
      const { error: insertError } = await supabase.from("users").insert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        role: user.user_metadata?.role || "volunteer",
        created_at: new Date(user.created_at).toISOString(),
      })

      results.push({
        user: {
          id: user.id,
          email: user.email,
          metadata: user.user_metadata,
        },
        success: !insertError,
        error: insertError ? insertError.message : null,
      })
    }

    return NextResponse.json({
      fixed: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      total: missingUsers.length,
      details: results,
    })
  } catch (error) {
    console.error("Error in fix users route:", error)
    return NextResponse.json({ error: "An unexpected error occurred", details: String(error) }, { status: 500 })
  }
}

