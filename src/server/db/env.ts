import "server-only";

type ServerEnvName =
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "CONTENT_ENCRYPTION_KEY"
  | "LLM_API_KEY";

export function requireServerEnv(name: ServerEnvName): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}
