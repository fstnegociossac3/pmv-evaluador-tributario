import { describe, expect, it } from "vitest";

import {
  MODULE_IDS,
  MODULE_LAYERS,
  MODULES,
  getModule,
} from "@/modules/registry";

describe("module registry", () => {
  it("registers every planned module exactly once", () => {
    const registeredIds = MODULES.map((definition) => definition.id).sort();
    const plannedIds = [...MODULE_IDS].sort();

    expect(new Set(registeredIds).size).toBe(registeredIds.length);
    expect(registeredIds).toEqual(plannedIds);
  });

  it("declares the four architectural layers", () => {
    for (const definition of MODULES) {
      expect(definition.layers).toEqual(MODULE_LAYERS);
    }
  });

  it("resolves a module by id", () => {
    expect(getModule("eligibility")?.name).toBe("Motor de elegibilidad");
    expect(getModule("unknown" as never)).toBeUndefined();
  });
});
