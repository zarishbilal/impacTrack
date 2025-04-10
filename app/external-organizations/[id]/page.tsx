"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react"
import { getExternalOrganizationById } from "../../../services/organization-service"
import type { ExternalOrganization } from "../../../types/organization"

export default function ExternalOrganizationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [organization, setOrganization] = useState<ExternalOrganization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrganization() {
      try {
        setLoading(true)
        setError(null)

        const id = Number.parseInt(params.id)
        if (isNaN(id)) {
          setError("Invalid organization ID")
          return
        }

        const data = await getExternalOrganizationById(id)
        setOrganization(data)
      } catch (err) {
        console.error("Error fetching organization:", err)
        setError("Failed to load organization details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrganization()
  }, [params.id])

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <p>Loading organization details...</p>
        </div>
      </div>
    )
  }

  if (error || !organization) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-destructive mb-4">{error || "Organization not found"}</p>
            <Link href="/external-organizations">
              <Button>Back to Organizations</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <Link href="/external-organizations" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Organizations
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{organization.Name}</h1>
            <p className="text-muted-foreground">{organization.LocationDisplay}</p>
          </div>
          {/* <Link href={`/organizations/import/${organization.Id}`}>
            <Button>Import Organization</Button>
          </Link> */}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
              <p>{organization.Id}</p>
            </div>
            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Agency GUID</h3>
              <p>{organization.AgencyGuid}</p>
            </div>
            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Agency Type</h3>
              <p>Type {organization.AgencyTypeId}</p>
            </div>
            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>
                  {organization.City}, {organization.ProvinceDescription}, {organization.CountryDescription}
                </p>
              </div>
            </div>
            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Public Page URL</h3>
              <div className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="break-all">{organization.UrlForPublicPage}</p>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-end">
            <Link href={`/organizations/import/${organization.Id}`}>
              <Button>Import to ImpacTrack</Button>
            </Link>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  )
}

