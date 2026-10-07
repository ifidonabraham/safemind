import { expect, test } from "vitest";

import { GET } from "@/app/api/v1/health/route";

test("GET /api/v1/health returns the envelope", async () => {
  const response = GET();

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    data: { status: "ok" },
    error: null,
  });
});
