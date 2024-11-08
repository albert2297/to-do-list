import { renderHook, act } from "@testing-library/react";
import { useTodoItems } from "./useTodoItems";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FormEvent } from "react";

describe("useTodoItems Hook", () => {
  const initialItems = [{ text: "Task 1", completed: false }];
  const setItems = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("saves items to localStorage when items change", () => {
    renderHook(() => useTodoItems({ items: initialItems, setItems }));

    expect(localStorage.getItem("todo-items")).toBe(
      JSON.stringify(initialItems)
    );
  });

  it("deletes an item when handleDeleteItem is called", () => {
    const { result } = renderHook(() =>
      useTodoItems({ items: initialItems, setItems })
    );

    act(() => {
      result.current.handleDeleteItem(0);
    });

    expect(setItems).toHaveBeenCalledWith([]);
    expect(localStorage.getItem("todo-items")).toBe(JSON.stringify([]));
  });

  it("edits an item when handleEditItem is called", () => {
    const { result } = renderHook(() =>
      useTodoItems({ items: initialItems, setItems })
    );

    act(() => {
      result.current.handleEditItem(0, "Updated Task");
    });

    expect(setItems).toHaveBeenCalledWith([
      { text: "Updated Task", completed: false },
    ]);
  });

  it("adds a new item on form submit", () => {
    const { result } = renderHook(() =>
      useTodoItems({ items: initialItems, setItems })
    );

    act(() => {
      result.current.setInputValue("New Task");
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

  it("does not add an item if input is empty on form submit", () => {
    const { result } = renderHook(() =>
      useTodoItems({ items: initialItems, setItems })
    );

    act(() => {
      result.current.handleFormSubmit({
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>);
    });

    expect(setItems).not.toHaveBeenCalled();
    expect(result.current.isInputEmpty).toBe(true);
  });

  it("toggles complete status of an item", () => {
    const { result } = renderHook(() =>
      useTodoItems({ items: initialItems, setItems })
    );

    act(() => {
      result.current.toggleComplete(0);
    });

    expect(setItems).toHaveBeenCalledWith([
      { text: "Task 1", completed: true },
    ]);
  });

  it("updates inputValue and resets isInputEmpty on input change", () => {
    const { result } = renderHook(() =>
      useTodoItems({ items: initialItems, setItems })
    );

    act(() => {
      result.current.handleInputOnChange({
        target: { value: "Updated Input" },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe("Updated Input");
    expect(result.current.isInputEmpty).toBe(false);
  });
});
