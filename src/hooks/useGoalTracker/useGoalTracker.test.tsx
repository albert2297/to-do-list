import { renderHook } from "@testing-library/react";
import { useGoalTracker } from "./useGoalTracker";
import { describe, it, expect } from "vitest";

describe("useGoalTracker Hook", () => {
  it("returns 0% progress and a message when no tasks are completed", () => {
    const { result } = renderHook(() =>
      useGoalTracker({ goal: 5, completed: 0 })
    );

    expect(result.current.progress).toBe(0);
    expect(result.current.message).toBe("No tasks completed");
  });

  it("returns the correct progress and message when some tasks are completed", () => {
    const { result } = renderHook(() =>
      useGoalTracker({ goal: 5, completed: 2 })
    );

    expect(result.current.progress).toBe(40);
    expect(result.current.message).toBe("Keep going!");
  });

  it("returns 100% progress and a success message when all tasks are completed", () => {
    const { result } = renderHook(() =>
      useGoalTracker({ goal: 5, completed: 5 })
    );

    expect(result.current.progress).toBe(100);
    expect(result.current.message).toBe("You did it, now enjoy the success!");
  });

  it("returns 0% progress and 'No tasks completed' message when goal is 0", () => {
    const { result } = renderHook(() =>
      useGoalTracker({ goal: 0, completed: 0 })
    );

    expect(result.current.progress).toBe(0);
    expect(result.current.message).toBe("No tasks completed");
  });

  it("handles progress correctly when completed exceeds goal", () => {
    const { result } = renderHook(() =>
      useGoalTracker({ goal: 5, completed: 6 })
    );

    expect(result.current.progress).toBeGreaterThan(100);
    expect(result.current.message).toBe("You did it, now enjoy the success!");
  });
});
