import type { ReactNode } from "react";

import { StudentShell } from "@/components/app/student-shell";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return <StudentShell>{children}</StudentShell>;
}
