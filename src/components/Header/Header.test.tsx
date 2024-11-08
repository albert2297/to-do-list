import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";
import styles from "./Header.module.css";

import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders the title correctly", () => {
    render(<Header title="Test Title" />);

    const titleElement = screen.getByRole("heading", { name: "Test Title" });
    expect(titleElement).toBeInTheDocument();
  });

  it("shows the icon when showIcon is true", () => {
    render(<Header title="Title with Icon" showIcon={true} />);

    const iconElement = screen.getByTestId("header-icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass(styles["header-icon"]);
  });

  it("hides the icon when showIcon is false", () => {
    render(<Header title="Title without Icon" showIcon={false} />);

    const iconElement = screen.queryByTestId("header-icon");
    expect(iconElement).not.toBeInTheDocument();
  });

  it("has the correct aria attributes", () => {
    render(<Header title="Accessible Title" />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveAttribute("aria-labelledby", "header-title");

    const iconElement = screen.queryByTestId("header-icon");
    if (iconElement) {
      expect(iconElement).toHaveAttribute("aria-hidden", "true");
    }
  });
});
