import type { ReactNode } from "react";

import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-surface focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <PublicHeader />
      <div id="content" className="page-enter flex w-full min-w-0 flex-1 flex-col">
        {children}
      </div>
      <PublicFooter />
    </>
  );
}
