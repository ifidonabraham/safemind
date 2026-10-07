import { describe, expect, test } from "vitest";
import { z } from "zod";

import {
  API_ERROR_STATUS,
  fail,
  ok,
  zodErrorToEnvelope,
} from "@/lib/api/envelope";

describe("api envelope", () => {
  test("ok wraps data and clears error", async () => {
    const response = ok({ status: "ok" });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      data: { status: "ok" },
      error: null,
    });
  });

  test("fail uses the spec status for each code", async () => {
    const response = fail("UNAUTHENTICATED", "Sign in to continue.");
    const body = await response.json();

    expect(response.status).toBe(API_ERROR_STATUS.UNAUTHENTICATED);
    expect(body).toEqual({
      data: null,
      error: { code: "UNAUTHENTICATED", message: "Sign in to continue." },
    });
  });

  test("zod errors become a validation envelope", async () => {
    const parsed = z
      .object({ score: z.number().int().min(1).max(5) })
      .safeParse({ score: 9 });

    expect(parsed.success).toBe(false);
    if (parsed.success) {
      return;
    }

    const response = zodErrorToEnvelope(parsed.error);
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body.data).toBeNull();
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(typeof body.error.fields.score).toBe("string");
  });
});
