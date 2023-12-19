import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ItemComponent from "./ItemComponent";

// Test 1: Renders the component with an image
test("renders with an image", () => {
  const mockItem = {
    _id: "1",
    title: "Test Item",
    price: 100,
    photoFilenames: ["image.jpg"],
    seller: "TestSeller",
  };

  render(
    <Router>
      <ItemComponent item={mockItem} />
    </Router>
  );

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "image.jpg");
  expect(image).toHaveAttribute("alt", "Test Item");
  expect(screen.getByText("Test Item")).toBeInTheDocument();
  expect(screen.getByText("$100")).toBeInTheDocument();
  expect(screen.getByText("by TestSeller")).toBeInTheDocument();
});

// Test 2: Renders the component without an image
test("renders without an image", () => {
  const mockItem = {
    _id: "2",
    title: "Another Test Item",
    price: 200,
    photoFilenames: [],
    seller: "AnotherTestSeller",
  };

  render(
    <Router>
      <ItemComponent item={mockItem} />
    </Router>
  );

  expect(screen.queryByRole("img")).toBeNull();
  expect(screen.getByText("Another Test Item")).toBeInTheDocument();
  expect(screen.getByText("$200")).toBeInTheDocument();
  expect(screen.getByText("by AnotherTestSeller")).toBeInTheDocument();
});

// Test 3: Verifies item link is correct
test("item link is correct", () => {
  const mockItem = {
    _id: "3",
    title: "Link Test Item",
    price: 300,
    photoFilenames: [],
    seller: "LinkTestSeller",
  };

  render(
    <Router>
      <ItemComponent item={mockItem} />
    </Router>
  );

  const itemLink = screen.getByRole("link", { name: "Link Test Item" });
  expect(itemLink).toHaveAttribute("href", "/item/3");
});

// Test 4: Verifies seller link is correct
test("seller link is correct", () => {
  const mockItem = {
    _id: "4",
    title: "Seller Link Test Item",
    price: 400,
    photoFilenames: [],
    seller: "SellerLinkTest",
  };

  render(
    <Router>
      <ItemComponent item={mockItem} />
    </Router>
  );

  const sellerLink = screen.getByRole("link", { name: "SellerLinkTest" });
  expect(sellerLink).toHaveAttribute("href", "/user/SellerLinkTest");
});
