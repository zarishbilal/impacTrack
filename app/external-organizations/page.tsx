"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Building } from "lucide-react"
import { getExternalOrganizations } from "../../services/organization-service"
import type { ExternalOrganization } from "../../types/organization"

export default function ExternalOrganizationsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [organizations, setOrganizations] = useState<ExternalOrganization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "")

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        setLoading(true)
        setError(null)

        const params: Record<string, string | number> = {}
        if (searchParams.get("name")) params.name = searchParams.get("name")!
        if (searchParams.get("city")) params.city = searchParams.get("city")!
        if (searchParams.get("province")) params.province = searchParams.get("province")!
        if (searchParams.get("country")) params.country = searchParams.get("country")!

        const data = await getExternalOrganizations(params)
        setOrganizations(data)
      } catch (err) {
        console.error("Error fetching organizations:", err)
        setError("Failed to load organizations. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Update URL with search parameters
    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set("name", searchTerm)
    } else {
      params.delete("name")
    }

    router.push(`/external-organizations?${params.toString()}`)
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">External Organizations</h1>
          <p className="text-muted-foreground">Browse and search for organizations from external sources</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by organization name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>Loading organizations...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-destructive">{error}</p>
          </div>
        ) : organizations.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>No organizations found. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {organizations.map((org) => (
              <Card key={org.Id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{org.Name}</h3>
                        {/* <Badge variant="outline">External</Badge> */}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{org.LocationDisplay}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Building className="h-4 w-4 mr-1" />
                        <span className="text-sm">ID: {org.Id}</span>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 self-start">
                      <Link href={`/external-organizations/${org.Id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      {/* <Link href={`/organizations/import/${org.Id}`}>
                        <Button size="sm">Import</Button>
                      </Link> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

