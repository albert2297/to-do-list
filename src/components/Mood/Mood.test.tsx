import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { Mood } from "./Mood";
import { useMoodState } from "@/hooks";
import styles from "./Mood.module.css";
import "@testing-library/jest-dom";

vi.mock("@/hooks", () => ({
  useMoodState: vi.fn(),
}));

describe("Mood Component", () => {
  it("renders the mood icon", () => {
    (useMoodState as Mock).mockReturnValue({
      moodIcon: <span data-testid="mood-icon">🙂</span>,
      backgroundClass: styles["happy"],
    });

    render(<Mood items={[]} />);

    const moodIcon = screen.getByTestId("mood-icon");
    expect(moodIcon).toBeInTheDocument();
    expect(moodIcon).toHaveTextContent("🙂");
  });

  it("applies the correct background class", () => {
    (useMoodState as Mock).mockReturnValue({
      moodIcon: <span>🙂</span>,
      backgroundClass: styles["happy"],
    });

    render(<Mood items={[]} />);

    const moodContainer = screen.getByRole("img", { name: "Mood indicator" });
    expect(moodContainer).toHaveClass(styles["container"]);
    expect(moodContainer).toHaveClass(styles["happy"]);
  });

  it("has the correct accessibility attributes", () => {
    (useMoodState as Mock).mockReturnValue({
      moodIcon: <span>🙂</span>,
      backgroundClass: styles["neutral"],
    });

    render(<Mood items={[]} />);

    const moodContainer = screen.getByRole("img", { name: "Mood indicator" });
    expect(moodContainer).toHaveAttribute("role", "img");
    expect(moodContainer).toHaveAttribute("aria-label", "Mood indicator");
  });
});
