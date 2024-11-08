import { renderHook, act } from "@testing-library/react";
import { useTaskItem } from "./useTaskItem";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("useTaskItem Hook", () => {
  const defaultText = "Initial task text";
  const onEdit = vi.fn();
  const onToggleComplete = vi.fn();
  const completed = false;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with correct values", () => {
    const { result } = renderHook(() =>
      useTaskItem({ text: defaultText, onEdit, onToggleComplete, completed })
    );

    expect(result.current.isEditing).toBe(false);
    expect(result.current.currentText).toBe(defaultText);
  });

  it("enters editing mode when handleEditClick is called", () => {
    const { result } = renderHook(() =>
      useTaskItem({ text: defaultText, onEdit, onToggleComplete, completed })
    );

    act(() => {
      result.current.handleEditClick();
    });

    expect(result.current.isEditing).toBe(true);
  });

  it("saves changes and exits editing mode when handleSaveClick is called", () => {
    const { result } = renderHook(() =>
      useTaskItem({ text: defaultText, onEdit, onToggleComplete, completed })
    );

    act(() => {
      result.current.handleEditClick();
    });

    act(() => {
      result.current.handleInputOnChange("Updated task text");
    });

    act(() => {
      result.current.handleSaveClick();
    });

    expect(result.current.isEditing).toBe(false);
    expect(result.current.currentText).toBe("Updated task text");
    expect(onEdit).toHaveBeenCalledWith("Updated task text");
  });

  it("exits editing mode and resets text if input is empty on save", () => {
    const { result } = renderHook(() =>
      useTaskItem({ text: defaultText, onEdit, onToggleComplete, completed })
    );

    act(() => {
      result.current.handleEditClick();
    });

    act(() => {
      result.current.handleInputOnChange("");
    });

    act(() => {
      result.current.handleSaveClick();
    });

    expect(result.current.isEditing).toBe(false);
    expect(result.current.currentText).toBe(defaultText);
    expect(onEdit).not.toHaveBeenCalled();
  });

  it("calls onToggleComplete when handleToggleComplete is called", () => {
    const { result } = renderHook(() =>
      useTaskItem({ text: defaultText, onEdit, onToggleComplete, completed })
    );

    act(() => {
      result.current.handleToggleComplete();
    });

    expect(onToggleComplete).toHaveBeenCalled();
  });

  it("saves changes on input blur", () => {
    const { result } = renderHook(() =>
      useTaskItem({ text: defaultText, onEdit, onToggleComplete, completed })
    );

    act(() => {
      result.current.handleEditClick();
    });

    act(() => {
      result.current.handleInputOnChange("Updated task text");
    });

    act(() => {
      result.current.handleInputBlur();
    });

    expect(result.current.isEditing).toBe(false);
    expect(result.current.currentText).toBe("Updated task text");
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith("Updated task text");
  });
});
