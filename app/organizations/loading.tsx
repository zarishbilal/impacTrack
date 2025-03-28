import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-3/4 max-w-[500px]" />
          <Skeleton className="h-5 w-full max-w-[700px]" />
        </div>

        <Skeleton className="h-14 w-full max-w-[600px] mx-auto" />

        <div className="flex justify-center">
          <Skeleton className="h-10 w-[400px]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4 mt-4 mx-4" />
                <Skeleton className="h-4 w-1/2 mx-4" />
                <Skeleton className="h-16 w-full mx-4" />
                <Skeleton className="h-10 w-full mx-4 mb-4" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

