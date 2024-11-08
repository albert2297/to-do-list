import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskItem } from "./TaskItem";
import "@testing-library/jest-dom";

describe("TaskItem Component", () => {
  const text = "Sample Task";
  const handleDelete = vi.fn();
  const handleToggleComplete = vi.fn();
  const handleEdit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the task text correctly", () => {
    render(
      <TaskItem
        text={text}
        completed={false}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
      />
    );

    expect(screen.getByLabelText("Incomplete task")).toHaveTextContent(text);
  });

  it("shows the completed state and toggles complete status", () => {
    render(
      <TaskItem
        text={text}
        completed={true}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
      />
    );

    const completedTask = screen.getByLabelText("Completed task");
    expect(completedTask).toHaveTextContent(text);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleToggleComplete).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TaskItem
        text={text}
        completed={false}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
      />
    );

    const deleteButton = screen.getByLabelText("Delete task");
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalled();
  });

  it("enters edit mode and calls onEdit with the new text", () => {
    render(
      <TaskItem
        text={text}
        completed={false}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
      />
    );

    const editButton = screen.getByLabelText("Edit task");
    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.blur(input);

    expect(handleEdit).toHaveBeenCalledWith("Updated Task");
  });

  it("saves the new text when save button is clicked", () => {
    render(
      <TaskItem
        text={text}
        completed={false}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
      />
    );

    const editButton = screen.getByLabelText("Edit task");
    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Task Text" } });
    const saveButton = screen.getByLabelText("Save changes");
    fireEvent.click(saveButton);

    expect(handleEdit).toHaveBeenCalledWith("New Task Text");
  });
});
