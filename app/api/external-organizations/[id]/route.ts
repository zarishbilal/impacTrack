import { type NextRequest, NextResponse } from "next/server"
import organizationsData from "@/data/organizations.json"
import type { ExternalOrganization } from "@/types/organization"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 })
    }

    const organization = (organizationsData as ExternalOrganization[]).find((org) => org.Id === id)

    if (!organization) {
      return NextResponse.json({ success: false, error: "Organization not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      organization,
    })
  } catch (error) {
    console.error("Error in external organization API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch organization" }, { status: 500 })
  }
}

