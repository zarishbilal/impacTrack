"use server"

import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

const organizationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().min(10).max(500),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().min(5),
})

export async function createOrganization(formData: z.infer<typeof organizationSchema>) {
  try {
    // Validate the form data
    const validatedData = organizationSchema.parse(formData)

    // Create a Supabase client with the user's session
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })

    // Prepare the data for insertion
    const organizationData = {
      id: uuidv4(), // Generate a UUID for the organization
      name: validatedData.name,
      email: validatedData.email,
      website: validatedData.website || null,
      description: validatedData.description,
      phone: validatedData.phone || null,
      address: validatedData.address,
      created_at: new Date().toISOString(),
    }

    // Insert the data into Supabase
    const { error } = await supabase.from("organizations").insert(organizationData)

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    // Only return success without any additional information
    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid form data. Please check your inputs.",
      }
    }

    return {
      success: false,
      error: "Failed to create organization. Please try again.",
    }
  }
}
