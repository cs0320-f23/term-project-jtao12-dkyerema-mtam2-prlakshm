import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("../mongo/Mongo-Functions", () => ({
  initializeStitchClient: vi.fn(),
}));

function setup() {
  return {
    user: userEvent.setup(),
    ...render(<App />),
  };
}

describe("App component tests", () => {
  beforeEach(() => {
    // Reset any mocks before each test if necessary
  });

  afterEach(() => {
    // Cleanup after each test if necessary
  });

  it("renders the main header with site title", () => {
    setup();
    expect(screen.getByText("Artist's Corner PVD")).toBeInTheDocument();
  });

  it("navigates to About page", async () => {
    const { user } = setup();
    await user.click(screen.getByText(/About/i));
    await waitFor(() => {
      expect(screen.getByText(/Why we're here/i)).toBeInTheDocument();
    });
  });

  it("navigates to a category page", async () => {
    const { user } = setup();
    await user.click(screen.getByText(/Accessories/i));
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Accessories/i })
      ).toBeInTheDocument();
    });
  });
});
