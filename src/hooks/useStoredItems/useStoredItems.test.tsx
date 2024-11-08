import { renderHook } from "@testing-library/react";
import { useStoredItems } from "./useStoredItems";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { IItem } from "@/interfaces";

describe("useStoredItems Hook", () => {
  const mockItems: IItem[] = [{ completed: false, text: "Task 1" }];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("initializes items as an empty array if localStorage is empty", () => {
    const { result } = renderHook(() => useStoredItems());
    expect(result.current.items).toEqual([]);
  });

  it("loads items from localStorage if available", () => {
    localStorage.setItem("todo-items", JSON.stringify(mockItems));

    const { result } = renderHook(() => useStoredItems());
    expect(result.current.items).toEqual(mockItems);
  });

  it("handles invalid JSON in localStorage gracefully", () => {
    localStorage.setItem("todo-items", "{ invalid JSON }");
    const consoleSpy = vi.spyOn(console, "error");
    renderHook(() => useStoredItems());

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error parsing items from localStorage:",
      expect.any(SyntaxError)
    );
  });
});
