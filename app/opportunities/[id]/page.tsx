import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Building, ExternalLink, Heart, Share2 } from "lucide-react"

export default function OpportunityDetailPage() {
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Link href="/opportunities" className="text-primary hover:underline inline-flex items-center mb-4">
              ← Back to opportunities
            </Link>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=500&width=800"
                  alt="Beach Cleanup Initiative"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Save</span>
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Environment</Badge>
              <Badge variant="outline">Beach Cleanup</Badge>
              <Badge variant="outline">Outdoor</Badge>
            </div>
            <h1 className="text-3xl font-bold">Beach Cleanup Initiative</h1>
            <div className="flex items-center text-muted-foreground">
              <Building className="h-5 w-5 mr-2" />
              <span>Organized by Ocean Guardians</span>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="prose max-w-none">
                <h3>About This Opportunity</h3>
                <p>
                  Join us for a day of beach cleanup to help protect our oceans and marine life. We'll be collecting
                  trash and recyclables from the shoreline to prevent them from entering the ocean.
                </p>
                <p>
                  This is a great opportunity for individuals, families, and groups to make a tangible difference in our
                  environment. No experience is necessary, and all cleaning supplies will be provided.
                </p>
                <h3>What You'll Be Doing</h3>
                <ul>
                  <li>Collecting trash and recyclables from the beach</li>
                  <li>Sorting collected items for proper disposal</li>
                  <li>Recording data on the types of debris found</li>
                  <li>Learning about marine conservation and pollution prevention</li>
                </ul>
                <h3>Requirements</h3>
                <ul>
                  <li>All ages welcome (children under 16 must be accompanied by an adult)</li>
                  <li>Wear comfortable clothes that can get dirty</li>
                  <li>Bring sunscreen, hat, and water bottle</li>
                  <li>Closed-toe shoes recommended</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="organization" className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ocean Guardians</h3>
                  <p className="text-muted-foreground">Environmental Conservation Organization</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <p>
                  Ocean Guardians is a non-profit organization dedicated to protecting marine ecosystems through
                  education, advocacy, and direct action. We organize regular beach cleanups, educational workshops, and
                  conservation initiatives.
                </p>
                <p>
                  Founded in 2010, we have removed over 50 tons of debris from beaches and waterways, and educated
                  thousands of people about marine conservation.
                </p>
              </div>
              <Button variant="outline" className="mt-2">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Organization Website
              </Button>
            </TabsContent>
            <TabsContent value="location" className="space-y-4 pt-4">
              <div className="aspect-[16/9] w-full rounded-lg bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Map Location</h3>
                  <p className="text-sm text-muted-foreground mt-2">Miami Beach, FL - South Beach Area</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <h3>Getting There</h3>
                <p>
                  We'll meet at the South Beach entrance near the lifeguard station. Street parking is available, and
                  public transportation options include bus routes 120 and 150.
                </p>
                <p>
                  <strong>Address:</strong> 1001 Ocean Drive, Miami Beach, FL 33139
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Event Details</h3>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Date</h4>
                    <p className="text-muted-foreground">June 15, 2024</p>
                    <p className="text-muted-foreground">9:00 AM - 1:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">Miami Beach, FL</p>
                    <p className="text-muted-foreground">South Beach Area</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Commitment</h4>
                    <p className="text-muted-foreground">One-time event, 4 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Spots Available</h4>
                    <p className="text-muted-foreground">25 out of 50 spots filled</p>
                  </div>
                </div>
              </div>
              <Button className="w-full">Register Now</Button>
              <p className="text-xs text-center text-muted-foreground">
                You'll be redirected to the organization's website to complete registration
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Similar Opportunities</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Wildlife Conservation"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Wildlife Conservation</h4>
                    <p className="text-sm text-muted-foreground">Nature Protectors</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Jul 10, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Park Cleanup"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Park Cleanup</h4>
                    <p className="text-sm text-muted-foreground">City Parks Foundation</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Jun 22, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="River Restoration"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">River Restoration</h4>
                    <p className="text-sm text-muted-foreground">Watershed Alliance</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Jul 5, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

