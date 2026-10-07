import { Skeleton } from "@/components/ui/skeleton";

export default function DevUiLoading() {
  return (
    <div aria-busy="true" className="mx-auto w-full max-w-[1120px] px-4 py-16">
      <span className="sr-only">Loading</span>
      <Skeleton className="h-10 w-56" />
      <Skeleton className="mt-6 h-40" />
    </div>
  );
}
