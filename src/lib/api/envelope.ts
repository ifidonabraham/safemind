import { ZodError } from "zod";

export const API_ERROR_STATUS = {
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  RATE_LIMITED: 429,
  INTERNAL: 500,
} as const;

export type ApiErrorCode = keyof typeof API_ERROR_STATUS;

export type ApiErrorBody = {
  code: ApiErrorCode;
  message: string;
  fields?: Record<string, string>;
};

export type ApiSuccess<T> = {
  data: T;
  error: null;
};

export type ApiFailure = {
  data: null;
  error: ApiErrorBody;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export function ok<T>(data: T, status = 200): Response {
  const body: ApiSuccess<T> = { data, error: null };
  return Response.json(body, { status });
}

export function fail(
  code: ApiErrorCode,
  message: string,
  fields?: Record<string, string>,
): Response {
  const error: ApiErrorBody = fields
    ? { code, message, fields }
    : { code, message };
  const body: ApiFailure = { data: null, error };
  return Response.json(body, { status: API_ERROR_STATUS[code] });
}

export function zodErrorToEnvelope(error: ZodError): Response {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const key =
      issue.path.map((segment) => String(segment)).join(".") || "body";
    if (!fields[key]) {
      fields[key] = issue.message;
    }
  }

  return fail("VALIDATION_ERROR", "Check the highlighted fields.", fields);
}
