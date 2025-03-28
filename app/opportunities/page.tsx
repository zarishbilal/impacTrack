import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Filter, Map, List } from "lucide-react"
import OpportunityCard from "@/components/opportunity-card"
import supabase from "@/lib/supabase"

// This is a Server Component that fetches data from Supabase
async function getOpportunities() {
  console.log("Fetching opportunities from Supabase...")
  const { data, error } = await supabase
    .from("opportunities")
    .select("*, organizations(name)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching opportunities:", error)
    return []
  }

  console.log("Opportunities fetched:", data)
  return data || []
}

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities()

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Find Volunteer Opportunities</h1>
          <p className="text-muted-foreground">
            Browse and filter volunteer opportunities that match your interests and availability
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="grid gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for opportunities..."
              className="pl-10 py-6 text-base rounded-lg border-muted-foreground/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            {/* Filters Sidebar */}
            <div className="space-y-6 p-4 border rounded-lg bg-background">
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                <Button variant="outline" size="sm" className="w-full">
                  Clear All
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Location</h4>
                <div className="flex gap-2">
                  <Input placeholder="City, state, or zip" className="text-sm" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                <div className="pt-2">
                  <h5 className="text-xs font-medium mb-1">Distance (miles)</h5>
                  <Slider defaultValue={[25]} max={100} step={5} className="py-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Date</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-anytime" />
                    <label
                      htmlFor="date-anytime"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Anytime
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-today" />
                    <label
                      htmlFor="date-today"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Today
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-this-week" />
                    <label
                      htmlFor="date-this-week"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This week
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-this-month" />
                    <label
                      htmlFor="date-this-month"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This month
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Categories</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-education" />
                    <label
                      htmlFor="category-education"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Education
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-environment" />
                    <label
                      htmlFor="category-environment"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Environment
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-healthcare" />
                    <label
                      htmlFor="category-healthcare"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Healthcare
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-animals" />
                    <label
                      htmlFor="category-animals"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Animals
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-community" />
                    <label
                      htmlFor="category-community"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Community
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Skills Required</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-none" />
                    <label
                      htmlFor="skill-none"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      No experience needed
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-teaching" />
                    <label
                      htmlFor="skill-teaching"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Teaching
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-technical" />
                    <label
                      htmlFor="skill-technical"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Technical
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-language" />
                    <label
                      htmlFor="skill-language"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Language
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    Environment
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
                      <span className="sr-only">Remove filter</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    Within 25 miles
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
                      <span className="sr-only">Remove filter</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  </Badge>
                </div>
                <Tabs defaultValue="grid" className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                    <TabsTrigger value="grid" className="flex items-center gap-2">
                      <List className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">Grid</span>
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">Map</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="grid" className="mt-4">
                    {opportunities.length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium">No opportunities found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {opportunities.map((opportunity) => (
                          <OpportunityCard
                            key={opportunity.id}
                            title={opportunity.title}
                            organization={opportunity.organizations?.name || "Organization"}
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
                    {opportunities.length > 0 && (
                      <div className="flex justify-center mt-8">
                        <Button variant="outline" className="mx-auto">
                          Load More
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="map" className="mt-4">
                    <div className="aspect-[16/9] w-full rounded-lg bg-muted flex items-center justify-center">
                      <div className="text-center p-8">
                        <Map className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Map View</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Interactive map showing volunteer opportunities near your location.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

