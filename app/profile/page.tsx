"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Award, FileText, MapPin, Heart, Settings } from "lucide-react"
import OpportunityCard from "@/components/opportunity-card"

export default function ProfilePage() {
  const [progress, setProgress] = useState(75)

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle>Sarah Johnson</CardTitle>
                  <CardDescription>Volunteer since January 2023</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl">SJ</span>
                  </div>
                  <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 border-2 border-background"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Miami, Florida</p>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4 w-full text-center">
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-muted-foreground">Hours</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-muted-foreground">Causes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Teaching</Badge>
                    <Badge variant="secondary">Event Planning</Badge>
                    <Badge variant="secondary">Photography</Badge>
                    <Badge variant="secondary">First Aid</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Environment</Badge>
                    <Badge variant="outline">Education</Badge>
                    <Badge variant="outline">Animals</Badge>
                    <Badge variant="outline">Community</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Availability</h4>
                  <p className="text-sm text-muted-foreground">Weekends, Weekday evenings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">First-Time Volunteer</h4>
                    <p className="text-sm text-muted-foreground">Completed your first volunteer event</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">10+ Hours</h4>
                    <p className="text-sm text-muted-foreground">Contributed over 10 hours of volunteer work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Environmental Champion</h4>
                    <p className="text-sm text-muted-foreground">Participated in 3+ environmental events</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold">Upcoming Opportunities</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src="/placeholder.svg?height=300&width=400"
                          alt="Beach Cleanup"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-primary">Registered</Badge>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-lg">Beach Cleanup Initiative</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">Jun 15, 2024</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">Miami Beach, FL</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Badge variant="outline">Environment</Badge>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src="/placeholder.svg?height=300&width=400"
                          alt="Food Bank"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-primary">Registered</Badge>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-lg">Food Bank Assistant</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">Jun 22, 2024</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">Miami, FL</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Badge variant="outline">Food Security</Badge>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="past" className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold">Past Volunteer Work</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="h-24 w-full sm:w-32 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=200&width=300"
                          alt="Park Cleanup"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-bold text-lg">Park Cleanup</h3>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">May 12, 2024</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">4 hours</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="secondary">Environment</Badge>
                          <Button size="sm" variant="outline">
                            View Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="h-24 w-full sm:w-32 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=200&width=300"
                          alt="Animal Shelter"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-bold text-lg">Animal Shelter Assistant</h3>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">April 28, 2024</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">3 hours</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="secondary">Animals</Badge>
                          <Button size="sm" variant="outline">
                            View Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="saved" className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold">Saved Opportunities</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <OpportunityCard
                  title="Wildlife Conservation"
                  organization="Nature Protectors"
                  category="Environment"
                  location="Portland, OR"
                  date="Jul 10, 2024"
                  image="/placeholder.svg?height=300&width=400"
                />
                <OpportunityCard
                  title="Senior Companion"
                  organization="Elder Care"
                  category="Healthcare"
                  location="Denver, CO"
                  date="Weekly"
                  image="/placeholder.svg?height=300&width=400"
                />
                <OpportunityCard
                  title="Literacy Tutor"
                  organization="Reading Partners"
                  category="Education"
                  location="Online"
                  date="Flexible"
                  image="/placeholder.svg?height=300&width=400"
                />
              </div>
            </TabsContent>
            <TabsContent value="certificates" className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold">Certificates & Recognition</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-bold text-lg">Certificate of Appreciation</h3>
                          <Badge>Verified</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Awarded by Ocean Guardians for participation in Beach Cleanup Initiative
                        </p>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">May 15, 2024</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-bold text-lg">Volunteer Recognition</h3>
                          <Badge>Verified</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Awarded by Community Pantry for Food Bank Assistant role
                        </p>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">April 30, 2024</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Impact Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold text-primary">24</p>
                    <p className="text-sm text-muted-foreground">Hours Volunteered</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold text-primary">8</p>
                    <p className="text-sm text-muted-foreground">Events Attended</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold text-primary">5</p>
                    <p className="text-sm text-muted-foreground">Causes Supported</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold text-primary">3</p>
                    <p className="text-sm text-muted-foreground">Certificates Earned</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Causes Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Environment</span>
                        <span className="text-sm">50%</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Community</span>
                        <span className="text-sm">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Animals</span>
                        <span className="text-sm">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Education</span>
                        <span className="text-sm">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
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

