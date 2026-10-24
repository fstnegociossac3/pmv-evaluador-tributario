import { describe, expect, it } from "vitest";

import { reservedAdminRoutes, routes } from "@/config/routes";

describe("route plan", () => {
  it("defines unique public routes", () => {
    const publicRoutes = Object.values(routes);

    expect(new Set(publicRoutes).size).toBe(publicRoutes.length);
    expect(publicRoutes.every((route) => route.startsWith("/"))).toBe(true);
  });

  it("keeps administrative routes out of the public surface", () => {
    for (const route of Object.values(routes)) {
      expect(route.startsWith("/admin")).toBe(false);
    }
  });

  it("reserves the administrative prefix for future protected routes", () => {
    for (const route of Object.values(reservedAdminRoutes)) {
      expect(route.startsWith("/admin")).toBe(true);
    }
  });
});
