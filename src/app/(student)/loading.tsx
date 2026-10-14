import { Skeleton } from "@/components/ui/skeleton";

export default function StudentLoading() {
  return (
    <div aria-busy="true" className="mx-auto w-full max-w-[760px]">
      <span className="sr-only">Loading</span>
      <Skeleton className="h-8 w-40" />
      <Skeleton className="mt-6 h-36" />
      <Skeleton className="mt-4 h-36" />
    </div>
  );
}
