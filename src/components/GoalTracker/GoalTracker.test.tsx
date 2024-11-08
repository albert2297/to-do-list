import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { GoalTracker } from "./GoalTracker";
import { useGoalTracker } from "@/hooks";
import "@testing-library/jest-dom";

vi.mock("@/hooks", () => ({
  useGoalTracker: vi.fn(),
}));

describe("GoalTracker Component", () => {
  it("renders goal and completed values correctly", () => {
    (useGoalTracker as Mock).mockReturnValue({
      progress: 50,
      message: "Halfway there!",
    });

    render(<GoalTracker goal={100} completed={50} />);
    expect(screen.getByText("Goal: 50 / 100")).toBeInTheDocument();
  });

  it("displays the correct message", () => {
    (useGoalTracker as Mock).mockReturnValue({
      progress: 75,
      message: "Almost there!",
    });

    render(<GoalTracker goal={100} completed={75} />);
    expect(screen.getByText("Almost there!")).toBeInTheDocument();
  });

  it("sets the correct progress bar width based on progress", () => {
    (useGoalTracker as Mock).mockReturnValue({
      progress: 60,
      message: "Keep going!",
    });

    render(<GoalTracker goal={100} completed={60} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "60");
  });

  it("sets aria attributes correctly", () => {
    (useGoalTracker as Mock).mockReturnValue({
      progress: 40,
      message: "Keep going!",
    });

    render(<GoalTracker goal={100} completed={40} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "40");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    expect(progressBar).toHaveAttribute("aria-valuetext", "40% completed");
  });
});
