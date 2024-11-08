import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { SortableTaskItem } from "./SortableTaskItem";
import { useSortable } from "@dnd-kit/sortable";
import "@testing-library/jest-dom";

vi.mock("@dnd-kit/sortable", () => ({
  useSortable: vi.fn(),
}));

describe("SortableTaskItem Component", () => {
  const item = { text: "Test Task", completed: false };
  const index = 1;
  const handleDeleteItem = vi.fn();
  const toggleComplete = vi.fn();
  const handleEditItem = vi.fn();

  beforeEach(() => {
    (useSortable as Mock).mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: { x: 0, y: 0 },
      transition: "transform 0.2s ease",
    });
  });

  it("renders the task item with correct text", () => {
    render(
      <SortableTaskItem
        item={item}
        index={index}
        handleDeleteItem={handleDeleteItem}
        toggleComplete={toggleComplete}
        handleEditItem={handleEditItem}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("calls handleDeleteItem when delete is triggered", () => {
    render(
      <SortableTaskItem
        item={item}
        index={index}
        handleDeleteItem={handleDeleteItem}
        toggleComplete={toggleComplete}
        handleEditItem={handleEditItem}
      />
    );

    const deleteButton = screen.getByLabelText("Delete task");
    fireEvent.click(deleteButton);

    expect(handleDeleteItem).toHaveBeenCalledWith(index);
  });

  it("calls toggleComplete when toggle complete is triggered", () => {
    render(
      <SortableTaskItem
        item={item}
        index={index}
        handleDeleteItem={handleDeleteItem}
        toggleComplete={toggleComplete}
        handleEditItem={handleEditItem}
      />
    );

    const toggleButton = screen.getByRole("checkbox");
    fireEvent.click(toggleButton);

    expect(toggleComplete).toHaveBeenCalledWith(index);
  });

  it("calls handleEditItem when edit is triggered", () => {
    render(
      <SortableTaskItem
        item={item}
        index={index}
        handleDeleteItem={handleDeleteItem}
        toggleComplete={toggleComplete}
        handleEditItem={handleEditItem}
      />
    );

    const editButton = screen.getByLabelText("Edit task");
    fireEvent.click(editButton);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New Task Text" },
    });
    fireEvent.blur(screen.getByRole("textbox"));

    expect(handleEditItem).toHaveBeenCalledWith(index, "New Task Text");
  });

  it("applies the correct style based on transform and transition", () => {
    (useSortable as Mock).mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: { x: 50, y: 100 },
      transition: "transform 0.2s ease",
    });

    const { container } = render(
      <SortableTaskItem
        item={item}
        index={index}
        handleDeleteItem={handleDeleteItem}
        toggleComplete={toggleComplete}
        handleEditItem={handleEditItem}
      />
    );

    const sortableContainer = container.firstChild as HTMLElement;

    expect(sortableContainer).toHaveStyle(
      "transform: translate3d(50px, 100px, 0)"
    );
    expect(sortableContainer).toHaveStyle("transition: transform 0.2s ease");
  });
});
