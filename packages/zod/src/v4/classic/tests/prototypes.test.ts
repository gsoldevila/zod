import { expect, test } from "vitest";
import * as z from "zod/v4";

// With prototype-based methods, extensions must target the concrete schema
// prototype (e.g. ZodString) rather than the abstract ZodType. This is
// standard JS prototype semantics — no copy-to-instance loop is needed
// because prototype lookups traverse the chain automatically.
test("prototype extension", () => {
  (z.ZodString.prototype as any)._classic = function () {
    return "_classic";
  };

  // should pass
  const result = (z.string() as any)._classic();
  expect(result).toBe("_classic");

  // clean up
  delete (z.ZodString.prototype as any)._classic;
});
