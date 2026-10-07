import "server-only";

import { createClient } from "@supabase/supabase-js";

import { requirePublicEnv } from "@/lib/env";
import { requireServerEnv } from "@/server/db/env";

/** Bypasses row level security. Trusted server jobs only. */
export function createServiceRoleClient() {
  return createClient(
    requirePublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireServerEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
