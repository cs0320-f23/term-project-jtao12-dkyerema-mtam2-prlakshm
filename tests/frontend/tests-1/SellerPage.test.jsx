import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SellerPage from "./SellerPage";
import * as MongoFunctions from "../mongo/Mongo-Functions";

// Mock the useParams function from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    username: "testUser",
  }),
}));

// Mock the MongoDB functions
jest.mock("../mongo/Mongo-Functions", () => ({
  getAccountByUsername: jest.fn(),
  getItemById: jest.fn(),
}));

//Test 1: checks the component's behavior when no items are returned for the seller
test("renders with no items for the seller", async () => {
  MongoFunctions.getAccountByUsername.mockResolvedValue({
    currentListing_ids: [],
    pastListing_ids: [],
  });

  render(
    <Router>
      <SellerPage />
    </Router>
  );

  await waitFor(() => {
    expect(
      screen.getByText("No items found for this seller.")
    ).toBeInTheDocument();
  });
});

//Test 2: Rendering with Current and Sold Items
test("renders with current and sold items", async () => {
  MongoFunctions.getAccountByUsername.mockResolvedValue({
    currentListing_ids: ["1", "2"],
    pastListing_ids: ["3"],
  });

  MongoFunctions.getItemById.mockImplementation((id) =>
    Promise.resolve({ _id: id, title: `Item ${id}` })
  );

  render(
    <Router>
      <SellerPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});

//Test 3: Handling API Errors
test("handles API errors gracefully", async () => {
  MongoFunctions.getAccountByUsername.mockRejectedValue(new Error("API Error"));

  render(
    <Router>
      <SellerPage />
    </Router>
  );

  await waitFor(() => {
    expect(
      screen.getByText("No items found for this seller.")
    ).toBeInTheDocument();
  });
});

//Test 4: Rendering with Partial Data
//checks the behavior when only current listings or only sold items are available for the seller
test("renders correctly with only current listings available", async () => {
  MongoFunctions.getAccountByUsername.mockResolvedValue({
    currentListing_ids: ["1", "2"],
    pastListing_ids: [],
  });

  MongoFunctions.getItemById.mockImplementation((id) =>
    Promise.resolve({ _id: id, title: `Item ${id}` })
  );

  render(
    <Router>
      <SellerPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Current Listings")).toBeInTheDocument();
    expect(screen.queryByText("Sold Items")).not.toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });
});

test("renders correctly with only sold items available", async () => {
  MongoFunctions.getAccountByUsername.mockResolvedValue({
    currentListing_ids: [],
    pastListing_ids: ["3"],
  });

  MongoFunctions.getItemById.mockImplementation((id) =>
    Promise.resolve({ _id: id, title: `Item ${id}` })
  );

  render(
    <Router>
      <SellerPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Sold Items")).toBeInTheDocument();
    expect(screen.queryByText("Current Listings")).not.toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});

//Test 5: Handling Null or Undefined Account Data
//checks the component's behavior if the getAccountByUsername function returns null or undefined
test("renders correctly when the account data is null or undefined", async () => {
  MongoFunctions.getAccountByUsername.mockResolvedValue(null);

  render(
    <Router>
      <SellerPage />
    </Router>
  );

  await waitFor(() => {
    expect(
      screen.getByText("No items found for this seller.")
    ).toBeInTheDocument();
  });
});

//Test 6: Error Handling for Failed Item Fetches
//checks if the component can handle individual item fetch errors correctly.
test("handles individual item fetch errors gracefully", async () => {
  MongoFunctions.getAccountByUsername.mockResolvedValue({
    currentListing_ids: ["1"],
    pastListing_ids: ["2"],
  });

  MongoFunctions.getItemById.mockImplementation((id) =>
    id === "1"
      ? Promise.resolve({ _id: id, title: `Item ${id}` })
      : Promise.reject(new Error("Fetch error"))
  );

  render(
    <Router>
      <SellerPage />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
  });
});
