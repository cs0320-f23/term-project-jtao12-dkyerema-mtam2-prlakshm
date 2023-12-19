import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import * as MongoFunctions from "../mongo/Mongo-Functions";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    categoryName: "TestCategory",
  }),
}));

jest.mock("../mongo/Mongo-Functions");

// Test 1: Renders with items in the category
test("renders with items in the category", async () => {
  MongoFunctions.getItemsByCategory.mockResolvedValue([
    [{ _id: "1", title: "Item 1" }], // Master items
    [{ _id: "2", title: "Item 2" }], // Sold items
  ]);

  render(
    <Router>
      <CategoryPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});

// Test 2: Renders with no items in the category
test("renders with no items in the category", async () => {
  MongoFunctions.getItemsByCategory.mockResolvedValue([[], []]);

  render(
    <Router>
      <CategoryPage />
    </Router>
  );

  await waitFor(() => {
    expect(
      screen.getByText("No items found in this category.")
    ).toBeInTheDocument();
  });
});

// Test 3: Handles API errors gracefully
test("handles API errors gracefully", async () => {
  MongoFunctions.getItemsByCategory.mockRejectedValue(new Error("API Error"));

  render(
    <Router>
      <CategoryPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Error fetching items.")).toBeInTheDocument();
  });
});

// Test 4: Renders with only master items
test("renders with only master items", async () => {
  MongoFunctions.getItemsByCategory.mockResolvedValue([
    [{ _id: "1", title: "Item 1" }], // Master items
    [], // Sold items
  ]);

  render(
    <Router>
      <CategoryPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
  });
});

// Test 5: Renders with only sold items
test("renders with only sold items", async () => {
  MongoFunctions.getItemsByCategory.mockResolvedValue([
    [], // Master items
    [{ _id: "2", title: "Item 2" }], // Sold items
  ]);

  render(
    <Router>
      <CategoryPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });
});

// Test 6: Renders correctly when category data is undefined
test("renders correctly when category data is undefined", async () => {
  MongoFunctions.getItemsByCategory.mockResolvedValue(undefined);

  render(
    <Router>
      <CategoryPage />
    </Router>
  );

  await waitFor(() => {
    expect(
      screen.getByText("No items found in this category.")
    ).toBeInTheDocument();
  });
});
