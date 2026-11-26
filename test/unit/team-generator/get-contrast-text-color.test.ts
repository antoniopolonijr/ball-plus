import { describe, expect, it } from "vitest";

import { getContrastTextColor } from "@/features/team-generator/utils/get-contrast-text-color";

describe("getContrastTextColor", () => {
  it("returns white text for dark backgrounds", () => {
    expect(getContrastTextColor("#000000")).toBe("white");
    expect(getContrastTextColor("#2563EB")).toBe("white");
  });

  it("returns black text for light backgrounds", () => {
    expect(getContrastTextColor("#FFFFFF")).toBe("black");
    expect(getContrastTextColor("#FFFF00")).toBe("black");
  });

  it("uses white text at the brightness threshold", () => {
    expect(getContrastTextColor("#969696")).toBe("white");
  });
});
