import { type NextRequest, NextResponse } from "next/server"
import organizationsData from "@/data/organizations.json"
import type { ExternalOrganization } from "../../../types/organization"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get query parameters
    const name = searchParams.get("name")
    const city = searchParams.get("city")
    const province = searchParams.get("province")
    const country = searchParams.get("country")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    // Filter organizations based on query parameters
    let filteredOrganizations = [...organizationsData] as ExternalOrganization[]

    if (name) {
      filteredOrganizations = filteredOrganizations.filter((org) => org.Name.toLowerCase().includes(name.toLowerCase()))
    }

    if (city) {
      filteredOrganizations = filteredOrganizations.filter((org) => org.City.toLowerCase().includes(city.toLowerCase()))
    }

    if (province) {
      filteredOrganizations = filteredOrganizations.filter((org) =>
        org.ProvinceDescription.toLowerCase().includes(province.toLowerCase()),
      )
    }

    if (country) {
      filteredOrganizations = filteredOrganizations.filter((org) =>
        org.CountryDescription.toLowerCase().includes(country.toLowerCase()),
      )
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      filteredOrganizations = filteredOrganizations.slice(0, limit)
    }

    return NextResponse.json({
      success: true,
      count: filteredOrganizations.length,
      organizations: filteredOrganizations,
    })
  } catch (error) {
    console.error("Error in external organizations API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch organizations" }, { status: 500 })
  }
}

