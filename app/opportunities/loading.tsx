import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-3/4 max-w-[500px]" />
          <Skeleton className="h-5 w-full max-w-[700px]" />
        </div>

        <div className="grid gap-4">
          <Skeleton className="h-14 w-full max-w-[800px] mx-auto" />

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            {/* Filters Sidebar Skeleton */}
            <Skeleton className="h-[600px] w-full" />

            {/* Results Skeleton */}
            <div className="space-y-6">
              <div className="flex justify-between">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <Skeleton className="h-48 w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

