import type { ExternalOrganization } from "@/types/organization"

export async function getExternalOrganizations(params?: {
  name?: string
  city?: string
  province?: string
  country?: string
  limit?: number
}): Promise<ExternalOrganization[]> {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams()

    if (params?.name) queryParams.append("name", params.name)
    if (params?.city) queryParams.append("city", params.city)
    if (params?.province) queryParams.append("province", params.province)
    if (params?.country) queryParams.append("country", params.country)
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    const queryString = queryParams.toString()
    const url = `/api/external-organizations${queryString ? `?${queryString}` : ""}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch organizations: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch organizations")
    }

    return data.organizations
  } catch (error) {
    console.error("Error fetching external organizations:", error)
    throw error
  }
}

export async function getExternalOrganizationById(id: number): Promise<ExternalOrganization> {
  try {
    const response = await fetch(`/api/external-organizations/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch organization: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch organization")
    }

    return data.organization
  } catch (error) {
    console.error(`Error fetching external organization with ID ${id}:`, error)
    throw error
  }
}

