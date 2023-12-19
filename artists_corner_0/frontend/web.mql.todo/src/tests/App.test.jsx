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

// Mock components
jest.mock("./HomePage", () => () => <div>HomePage Mock</div>);
jest.mock("./AboutPage", () => () => <div>AboutPage Mock</div>);
jest.mock("./CategoryPage", () => () => <div>CategoryPage Mock</div>);
jest.mock("./ItemDetailPage", () => () => <div>ItemDetailPage Mock</div>);
jest.mock("./SellerPage", () => () => <div>SellerPage Mock</div>);

// Helper function to render App component with Router
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
};

// Test 1: Renders the Home Page on default route
test("renders the Home Page on default route", () => {
  renderWithRouter(<App />);
  expect(screen.getByText("HomePage Mock")).toBeInTheDocument();
});

// Test 2: Renders the About Page on '/about' route
test("renders the About Page on '/about' route", () => {
  renderWithRouter(<App />, { route: "/about" });
  expect(screen.getByText("AboutPage Mock")).toBeInTheDocument();
});

// Test 3: Renders the Category Page on '/category/:categoryName' route
test("renders the Category Page on '/category/:categoryName' route", () => {
  renderWithRouter(<App />, { route: "/category/Accessories" });
  expect(screen.getByText("CategoryPage Mock")).toBeInTheDocument();
});

// Test 4: Renders the Item Detail Page on '/item/:itemId' route
test("renders the Item Detail Page on '/item/:itemId' route", () => {
  renderWithRouter(<App />, { route: "/item/1" });
  expect(screen.getByText("ItemDetailPage Mock")).toBeInTheDocument();
});

// Test 5: Renders the Seller Page on '/user/:username' route
test("renders the Seller Page on '/user/:username' route", () => {
  renderWithRouter(<App />, { route: "/user/testUser" });
  expect(screen.getByText("SellerPage Mock")).toBeInTheDocument();
});
