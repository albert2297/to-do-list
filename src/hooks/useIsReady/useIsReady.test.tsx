import { renderHook, act } from "@testing-library/react";
import { useIsReady } from "./useIsReady";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("useIsReady Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initially returns false", () => {
    const { result } = renderHook(() => useIsReady());

    expect(result.current).toBe(false);
  });

  it("sets isReady to true after 10 ms", () => {
    const { result } = renderHook(() => useIsReady());

    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(result.current).toBe(true);
  });
});
