import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoList } from "./TodoList";
import "@testing-library/jest-dom";
import { useTodoList } from "@/hooks";

describe("TodoList Component", () => {
  const items = [
    { text: "Task 1", completed: false },
    { text: "Task 2", completed: true },
  ];
  const setItems = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Header, GoalTracker, Mood, and TextInputWithButton components", () => {
    render(<TodoList items={items} setItems={setItems} />);

    expect(
      screen.getByRole("heading", { name: "To-do List" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mood" })).toBeInTheDocument();
    expect(screen.getByLabelText("Goal: 1 / 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Mood indicator")).toBeInTheDocument();
    expect(screen.getByLabelText("Add a new task")).toBeInTheDocument();
  });

  it("allows adding a new task through the input and form submission", () => {
    render(<TodoList items={items} setItems={setItems} />);

    const input = screen.getByLabelText("Add a new task");
    fireEvent.change(input, { target: { value: "New Task" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(setItems).toHaveBeenCalled();
  });

  it("allows completing, editing, and deleting tasks", async () => {
    render(<TodoList items={items} setItems={setItems} />);

    const checkbox = screen.getByRole("checkbox", { name: "Mark as complete" });
    fireEvent.click(checkbox);
    expect(setItems).toHaveBeenCalled();

    const editButtons = screen.getAllByLabelText("Edit task");
    fireEvent.click(editButtons[0]);

    const inputs = await screen.findAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Updated Task" } });
    fireEvent.blur(inputs[0]);
    expect(setItems).toHaveBeenCalled();

    const deleteButtons = screen.getAllByLabelText("Delete task");
    fireEvent.click(deleteButtons[0]);
    expect(setItems).toHaveBeenCalled();
  });

  it("updates goal tracker when task list changes", () => {
    render(<TodoList items={items} setItems={setItems} />);

    const goalTracker = screen.getByLabelText("Goal: 1 / 2");
    expect(goalTracker).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox", { name: "Mark as complete" });
    fireEvent.click(checkbox);
    expect(setItems).toHaveBeenCalled();
  });

  it("calls setItems on drag end to reorder tasks", () => {
    const items = [
      { text: "Task 1", completed: false },
      { text: "Task 2", completed: true },
    ];
    const setItems = vi.fn();

    const { result } = renderHook(() => useTodoList({ items, setItems }));

    act(() => {
      result.current.handleDragEnd({ active: { id: 0 }, over: { id: 1 } });
    });

    expect(setItems).toHaveBeenCalledWith([
      { text: "Task 2", completed: true },
      { text: "Task 1", completed: false },
    ]);
  });
});
