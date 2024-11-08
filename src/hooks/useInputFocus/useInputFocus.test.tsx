import { renderHook } from "@testing-library/react";
import { useInputFocus } from "./useInputFocus";
import { describe, it, expect } from "vitest";

describe("useInputFocus Hook", () => {
  it("returns the provided externalRef when passed", () => {
    const externalRef = { current: document.createElement("input") };
    const { result } = renderHook(() => useInputFocus({ externalRef }));

    expect(result.current).toBe(externalRef);
  });

  it("returns an internal ref when no externalRef is provided", () => {
    const { result } = renderHook(() => useInputFocus({ externalRef: null }));

    if ("current" in result.current) {
      expect(result.current.current).toBeNull();
    } else {
      throw new Error("Expected a RefObject with a `current` property.");
    }
  });
});
