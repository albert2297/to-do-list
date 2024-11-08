import { renderHook, act } from "@testing-library/react";
import { useTodoList } from "./useTodoList";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ChangeEvent, FormEvent } from "react";

describe("useTodoList Hook", () => {
  const initialItems = [
    { text: "Task 1", completed: false },
    { text: "Task 2", completed: true },
  ];
  const setItems = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes sensors for drag-and-drop", () => {
    const { result } = renderHook(() =>
      useTodoList({ items: initialItems, setItems })
    );

    expect(result.current.sensors).toHaveLength(2);
  });

  it("deletes an item when handleDeleteItem is called", () => {
    const { result } = renderHook(() =>
      useTodoList({ items: initialItems, setItems })
    );

    act(() => {
      result.current.handleDeleteItem(0);
    });

    expect(setItems).toHaveBeenCalledWith([
      { text: "Task 2", completed: true },
    ]);
  });

  it("adds a new item on form submit", () => {
    const { result } = renderHook(() =>
      useTodoList({ items: initialItems, setItems })
    );

    act(() => {
      result.current.handleInputOnChange({
        target: { value: "New Task" },
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleFormSubmit({
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>);
    });

    expect(setItems).toHaveBeenCalledWith([
      ...initialItems,
      { text: "New Task", completed: false },
    ]);
    expect(result.current.inputValue).toBe("");
    expect(result.current.isInputEmpty).toBe(false);
  });

  it("toggles complete status of an item", () => {
    const { result } = renderHook(() =>
      useTodoList({ items: initialItems, setItems })
    );

    act(() => {
      result.current.toggleComplete(0);
    });

    expect(setItems).toHaveBeenCalledWith([
      { text: "Task 1", completed: true },
      { text: "Task 2", completed: true },
    ]);
  });

  it("handles drag end to reorder items", () => {
    const { result } = renderHook(() =>
      useTodoList({ items: initialItems, setItems })
    );

    act(() => {
      result.current.handleDragEnd({
        active: { id: "0" } as { id: UniqueIdentifier },
        over: { id: "1" } as { id: UniqueIdentifier },
      });
    });

    expect(setItems).toHaveBeenCalledWith([
      { text: "Task 2", completed: true },
      { text: "Task 1", completed: false },
    ]);
  });
});
