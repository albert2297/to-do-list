import { renderHook, act } from "@testing-library/react";
import { useCelebration } from "./useCelebration";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useCelebration Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("sets isConfettiVisible to true when mood is 'happy'", () => {
    const { result } = renderHook(() => useCelebration({ mood: "happy" }));

    expect(result.current.isConfettiVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(result.current.isConfettiVisible).toBe(false);
  });

  it("does not show confetti when mood is not 'happy'", () => {
    const { result, rerender } = renderHook(
      ({ mood }) => useCelebration({ mood }),
      {
        initialProps: { mood: "neutral" },
      }
    );

    expect(result.current.isConfettiVisible).toBe(false);

    rerender({ mood: "happy" });
    expect(result.current.isConfettiVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(result.current.isConfettiVisible).toBe(false);
  });

  it("cleans up the timer when unmounted", () => {
    const { result, unmount } = renderHook(() =>
      useCelebration({ mood: "happy" })
    );

    expect(result.current.isConfettiVisible).toBe(true);

    unmount();
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(result.current.isConfettiVisible).toBe(true);
  });
});
