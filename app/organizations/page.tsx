"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { createOrganization } from "@/app/organizations/register/actions"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

const organizationSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid website URL.",
    })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
})

export default function RegisterOrganizationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const { user, userRole, isLoading } = useAuth()

  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      email: user?.email || "",
      website: "",
      description: "",
      phone: "",
      address: "",
    },
  })

  // Update email field when user data is loaded
  useEffect(() => {
    if (user?.email) {
      form.setValue("email", user.email)
    }
  }, [user, form])

  async function onSubmit(values: z.infer<typeof organizationSchema>) {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await createOrganization(values)

      if (result.error) {
        setSubmitStatus("error")
        setErrorMessage(result.error)
      } else {
        setSubmitStatus("success")
        // Reset form after successful submission
        form.reset()
        // Redirect after a short delay
        setTimeout(() => {
          router.push("/organizations")
        }, 3000)
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated but not an organization, show message
  if (user && userRole !== "organization") {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Organization Account Required</AlertTitle>
            <AlertDescription className="text-amber-700">
              You need to be signed in with an organization account to register your organization. Please sign out and
              create a new account with the "Organization" role.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" onClick={() => router.push("/")}>
              Go to Home
            </Button>
            <Link href="/auth/signup">
              <Button>Create Organization Account</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Register Your Organization</h1>
          <p className="mt-2 text-muted-foreground">
            Join ImpacTrack to connect with volunteers and post opportunities
          </p>
        </div>

        {submitStatus === "success" && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Registration Successful!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your organization has been registered successfully. You will be redirected shortly.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Registration Failed</AlertTitle>
            <AlertDescription className="text-red-700">
              {errorMessage || "There was an error registering your organization. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
            <CardDescription>
              Please provide details about your organization. This information will be visible to volunteers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your organization name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@organization.org" {...field} />
                        </FormControl>
                        <FormDescription>This will be used for account verification.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.yourorganization.org" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City, State, Zip" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your organization, its mission, and the impact you make..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your organization and its mission (max 500 characters).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register Organization"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t px-6 py-4">
            <p className="text-sm text-muted-foreground">
              By registering, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

