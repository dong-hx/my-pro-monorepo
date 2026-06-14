import { Skeleton } from '@/shared/ui'

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <Skeleton className="h-10 w-64" />
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-card" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
