import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCom() {
  return (
    <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}
