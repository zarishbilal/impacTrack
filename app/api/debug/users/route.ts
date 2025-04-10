import { NextResponse } from "next/server"
import supabase from "@/lib/supabase"

export async function GET() {
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

    // Return both sets of users for comparison
    return NextResponse.json({
      authUsers: authUsers.users.map((user) => ({
        id: user.id,
        email: user.email,
        metadata: user.user_metadata,
        created_at: user.created_at,
      })),
      customUsers,
      authCount: authUsers.users.length,
      customCount: customUsers?.length || 0,
      missingUsers: authUsers.users
        .filter((authUser) => !customUsers?.some((customUser) => customUser.id === authUser.id))
        .map((user) => ({
          id: user.id,
          email: user.email,
          metadata: user.user_metadata,
        })),
    })
  } catch (error) {
    console.error("Error in debug route:", error)
    return NextResponse.json({ error: "An unexpected error occurred", details: String(error) }, { status: 500 })
  }
}

