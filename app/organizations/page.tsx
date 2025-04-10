"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import supabase from "@/lib/supabase"

interface Organization {
  id: string
  name: string
  address?: string
  description?: string
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])

  useEffect(() => {
    async function fetchOrganizations() {
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name, address, description")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching organizations:", error.message);
      } else {
        setOrganizations(data);
      }
    }

    fetchOrganizations();
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Organizations</h1>
      {organizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <OrganizationCard
              key={org.id}
              name={org.name}
              description={org.description || "No description available."}
            />
          ))}
        </div>
      ) : (
        <p>No organizations found</p>
      )}

      {/* ✅ CTA Section Added Here */}
      <div className="mt-12 bg-primary/10 rounded-lg p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Register Your Organization</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Are you a non-profit organization looking for volunteers? Register with ImpacTrack to connect with
          passionate volunteers and manage your opportunities.
        </p>
        <Link href="/organizations/register">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

function OrganizationCard({ name, description }: Pick<Organization, 'name' | 'description'>) {
  return (
    <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/organizations/${name.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Organization
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
