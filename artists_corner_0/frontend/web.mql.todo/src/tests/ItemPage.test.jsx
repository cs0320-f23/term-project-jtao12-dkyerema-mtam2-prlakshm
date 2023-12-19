import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BSON } from "mongodb-stitch-browser-sdk";
import ItemDetailPage from "../components/ItemDetailPage.jsx";
import CategoryPage from "../components/CategoryPage";
import * as MongoFunctions from "../mongo/Mongo-Functions";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("../mongo/Mongo-Functions", () => ({
  getItemsByCategory: vi.fn(),

  getItemById: vi.fn(),
  getAccountByUsername: vi.fn(),
}));

const mockItem = {
  _id: new BSON.ObjectId("5f50c31e68c1672a5e2c34a4"),
  title: "Blueno Abomination Digital Art Print",
  description:
    "Digital art print of blueno resurrected as a Cthulhu style eldritch horror abomination.",
  price: 5.99,
  photoFilenames: ["../data/photos/blueno_digital_art.jpg"],
  seller: "Jackie_Cohen",
};

const mockArtItems = [
  {
    _id: "656bb24eabfe68217e3eb92c",
    title: "Blueno Abomination Digital Art Print",
    seller: "Jackie_Cohen",
    price: 5.99,
    photoFilenames: ["../data/photos/blueno_digital_art.jpg"],
  },
];

// Mock seller data
const mockSeller = {
  username: "Jackie_Cohen",
  fullname: "Jackie Cohen",
  photoProfileFilenames: "../data/photos/paintGenius.png",
  contactInformation: {
    email: "paint_genius@brown.edu",
    "phone number": "555-987-6543",
    instagram: "PaintGenius_Jackie",
  },
};

beforeEach(() => {
  MongoFunctions.getItemById.mockResolvedValue(mockItem);
  MongoFunctions.getAccountByUsername.mockResolvedValue(mockSeller);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ItemDetailPage Tests", () => {
  const setup = () => {
    render(
      <MemoryRouter initialEntries={["/item/656bb24eabfe68217e3eb92c"]}>
        <Routes>
          <Route path="/item/:itemId" element={<ItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders item details correctly", async () => {
    setup();

    await waitFor(() => {
      expect(
        screen.getByText("Blueno Abomination Digital Art Print")
      ).toBeInTheDocument();
      expect(screen.getByText("$5.99")).toBeInTheDocument();
      expect(
        screen.getByText(/Digital art print of blueno resurrected/)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", {
          name: "Blueno Abomination Digital Art Print",
        })
      ).toBeInTheDocument();
    });
  });

  it("renders seller profile correctly", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText("Jackie Cohen")).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: "Jackie Cohen" })
      ).toBeInTheDocument();
    });
  });

  it("renders seller contact information correctly", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText("paint_genius@brown.edu")).toBeInTheDocument();
      expect(screen.getByText("555-987-6543")).toBeInTheDocument();
      expect(screen.getByText("@PaintGenius_Jackie")).toBeInTheDocument();
    });
  });
});

describe("Navigate from category page test", () => {
  beforeEach(() => {
    MongoFunctions.getItemsByCategory.mockImplementation((categoryName) => {
      if (categoryName === "art") {
        return Promise.resolve([mockArtItems, []]);
      }
      return Promise.resolve([[], []]);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("navigates to the correct item detail page when clicking on an item card", async () => {
    render(
      <MemoryRouter initialEntries={["/category/art"]}>
        <Routes>
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/item/:itemId" element={<ItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Blueno Abomination Digital Art Print")
      ).toBeInTheDocument();
    });

    const itemCardLink = screen
      .getByText("Blueno Abomination Digital Art Print")
      .closest("a");
    userEvent.click(itemCardLink);

    await waitFor(() => {
      expect(screen.getByText("Jackie Cohen")).toBeInTheDocument();
      expect(screen.getByText("$5.99")).toBeInTheDocument();
      expect(
        screen.getByText(/Digital art print of blueno resurrected/)
      ).toBeInTheDocument();
    });
  });
});

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
