import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <div
      aria-busy="true"
      className="mx-auto w-full max-w-[1120px] px-4 py-16 sm:px-6"
    >
      <span className="sr-only">Loading</span>
      <Skeleton className="h-8 w-40" />
      <Skeleton className="mt-6 h-20 max-w-xl" />
      <Skeleton className="mt-4 h-32" />
    </div>
  );
}
