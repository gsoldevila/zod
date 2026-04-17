import { expect, test } from "vitest";
import * as z from "zod/mini";

// With prototype-based methods, extensions must target the concrete schema
// prototype (e.g. ZodMiniString) rather than the abstract ZodMiniType or
// $ZodType. This is standard JS prototype semantics — no copy-to-instance
// loop is needed because prototype lookups traverse the chain automatically.
test("prototype extension — core augmentation on concrete type", () => {
  (z.ZodMiniString.prototype as any)._core = function () {
    return "_core";
  };

  // should pass
  const result = (z.string() as any)._core();
  expect(result).toBe("_core");

  // clean up
  delete (z.ZodMiniString.prototype as any)._core;
});

test("prototype extension — mini augmentation on concrete type", () => {
  (z.ZodMiniString.prototype as any)._mini = function () {
    return "_mini";
  };

  // should pass
  const result = (z.string() as any)._mini();
  expect(result).toBe("_mini");

  // clean up
  delete (z.ZodMiniString.prototype as any)._mini;
});
