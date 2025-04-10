import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Award, Clock, Heart } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import OpportunityCard from "@/components/opportunity-card"
import supabase from "@/lib/supabase"

// Fetch featured opportunities from Supabase
async function getFeaturedOpportunities() {
  console.log("Fetching featured opportunities from Supabase...")

  try {
    // Fetch opportunities without trying to join with organizations
    const { data: opportunities, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3)

    if (error) {
      console.error("Error fetching featured opportunities:", error)
      return []
    }

    // If we have opportunities, fetch the organization details separately
    if (opportunities && opportunities.length > 0) {
      // Get unique organization IDs
      const organizationIds = [...new Set(opportunities.map((opp) => opp.organization_id).filter(Boolean))]

      // If we have organization IDs, fetch their details
      if (organizationIds.length > 0) {
        const { data: organizations, error: orgError } = await supabase
          .from("organizations")
          .select("id, name")
          .in("id", organizationIds)

        if (orgError) {
          console.error("Error fetching organizations:", orgError)
        } else if (organizations) {
          // Create a map of organization id to name for quick lookup
          const orgMap = organizations.reduce<Record<string, string>>((map, org) => {
            map[org.id] = org.name
            return map
          }, {})

          // Add organization name to each opportunity
          opportunities.forEach((opp) => {
            if (opp.organization_id && orgMap[opp.organization_id]) {
              opp.organization_name = orgMap[opp.organization_id]
            } else {
              opp.organization_name = "Organization"
            }
          })
        }
      }
    }

    console.log("Featured opportunities fetched:", opportunities)
    return opportunities || []
  } catch (error) {
    console.error("Error in getFeaturedOpportunities:", error)
    return []
  }
}

export default async function Home() {
  const opportunities = await getFeaturedOpportunities()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/90 to-primary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Make an Impact Through Volunteering
                </h1>
                <p className="max-w-[600px] text-white/90 md:text-xl">
                  Connect with meaningful volunteer opportunities in your community. Track your impact and build a
                  better world together.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/opportunities">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Find Opportunities
                  </Button>
                </Link>
                <Link href="/organizations/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white bg-primary/30 hover:bg-white/10"
                  >
                    Register Organization
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=500&width=800"
                  alt="Volunteers working together"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px] space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Your Opportunity</h2>
              <p className="text-muted-foreground md:text-xl">
                Search for volunteer opportunities that match your interests and availability
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for opportunities..."
                  className="pl-10 py-6 text-base rounded-lg border-muted-foreground/20"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg border border-muted-foreground/20 bg-background">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Location</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg border border-muted-foreground/20 bg-background">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Date</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg border border-muted-foreground/20 bg-background">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Category</span>
                </div>
              </div>
              <Button size="lg" className="w-full sm:w-auto sm:self-end">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How ImpacTrack Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform makes it easy to find, apply for, and track your volunteer experiences
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <FeatureCard
              icon={<Search className="h-10 w-10" />}
              title="Find Opportunities"
              description="Search and filter volunteer opportunities based on your interests, location, and availability."
            />
            <FeatureCard
              icon={<Heart className="h-10 w-10" />}
              title="Apply with Ease"
              description="One-click registration for events and direct links to organization applications."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10" />}
              title="Track Your Impact"
              description="Monitor your volunteer hours, causes supported, and collect certifications."
            />
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Opportunities</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Discover these impactful volunteer opportunities in your community
              </p>
            </div>
          </div>

          {opportunities.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No opportunities available yet</h3>
              <p className="text-muted-foreground mt-2">Check back soon for new volunteer opportunities</p>
              <div className="mt-6">
                <Link href="/organizations/register">
                  <Button>Register Your Organization</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  title={opportunity.title}
                  organization={opportunity.organization_name || "Organization"}
                  category={opportunity.category}
                  location={opportunity.location}
                  date={new Date(opportunity.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  image="/placeholder.svg?height=300&width=400"
                />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-10">
            <Link href="/opportunities">
              <Button size="lg">View All Opportunities</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

