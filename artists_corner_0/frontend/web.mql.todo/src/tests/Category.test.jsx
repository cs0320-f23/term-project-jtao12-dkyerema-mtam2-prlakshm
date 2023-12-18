import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "../components/CategoryPage";
import * as MongoFunctions from "../mongo/Mongo-Functions";

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("../mongo/Mongo-Functions", () => ({
  getItemsByCategory: vi.fn(),
  getItemsBySubcategory: vi.fn(),
}));

const mockAccessoriesItems = [
  {
    _id: "656bb24eabfe68217e3eb92a",
    title: "Blue Green Beaded Bow Necklace",
    seller: "Sophia_Cheng",
    price: 15,
    photoFilenames: ["../data/photos/blue_green_bow_necklace_1.jpg"],
  },
  {
    _id: "656bb24eabfe68217e3eb92b",
    title: "Hand-Painted Frog Tote Bag",
    seller: "ArtsyTotes",
    price: 17.99,
    photoFilenames: ["../data/photos/frog_tote.jpg"],
  },
];

const mockClothingItems = [
  {
    _id: "656bb24eabfe68217e3eb927",
    title: "Vintage Denim Jacket",
    seller: "vintageVibes",
    price: 34.5,
    photoFilenames: ["../data/photos/vintage_denim_1.jpg"],
  },
  {
    _id: "656bb25aabfe68217e3eb93d",
    title: '\\"Be Kind\\" Tie-Dye Sweatshirt',
    seller: "FashionExplorer",
    price: 28.99,
    photoFilenames: ["../data/photos/tie_dye_sweatshirt_1.jpg"],
  },
];

const mockArtItems = [
  {
    _id: "656bb24eabfe68217e3eb92c",
    title: "Blueno Abomination Digital Art Print",
    seller: "Jackie_Cohen",
    price: 5.99,
    photoFilenames: ["../data/photos/blueno_digital_art.jpg"],
  },
  {
    _id: "656bb25aabfe68217e3eb93e",
    title: "Detailed Tree Drawing",
    seller: "Jackie_Cohen",
    price: 19.99,
    photoFilenames: ["../data/photos/tree_drawing.png"],
  },
  {
    _id: "656bb25aabfe68217e3eb940",
    title: "Sculptural Wire Wall Art of Dog",
    seller: "Wire&TuftCrafts",
    price: 24.99,
    photoFilenames: ["../data/photos/wire_wall_art.jpg"],
  },
  {
    _id: "656bb25aabfe68217e3eb939",
    title: "Warm Toned Two-Faced Painting",
    seller: "Jackie_Cohen",
    price: 26.99,
    photoFilenames: ["../data/photos/two_faced_painting.png"],
  },
  {
    _id: "656bb25aabfe68217e3eb946",
    title: "Pencil Sketch Forest Print",
    seller: "Jackie_Cohen",
    price: 7.99,
    photoFilenames: ["./data/photos/forest_print.jpg"],
  },
  {
    _id: "656bb25aabfe68217e3eb950",
    title: "Anatomical Heart Sculpture",
    seller: "Jackie_Cohen",
    price: 33.5,
    photoFilenames: ["../data/photos/anatomical_heart_sculpture.png"],
  },
  {
    _id: "656bb25aabfe68217e3eb94b",
    title: "Water Girl Digital Art Print",
    seller: "Jackie_Cohen",
    price: 32.25,
    photoFilenames: ["../data/photos/water_girl_digital_art.jpg"],
  },
];

beforeEach(() => {
  MongoFunctions.getItemsByCategory.mockImplementation((categoryName) => {
    if (categoryName === "accessories") {
      return Promise.resolve([mockAccessoriesItems, []]);
    } else if (categoryName === "clothing") {
      return Promise.resolve([mockClothingItems, []]);
    } else if (categoryName === "art") {
      return Promise.resolve([mockArtItems, []]);
    }
    return Promise.resolve([[], []]);
  });
  MongoFunctions.getItemsBySubcategory.mockResolvedValue([
    mockAccessoriesItems,
    [],
  ]);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CategoryPage Tests", () => {
  it("displays correct item names from Accessories category after data fetch", async () => {
    render(
      <MemoryRouter initialEntries={["/category/accessories"]}>
        <Routes>
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Blue Green Beaded Bow Necklace")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Hand-Painted Frog Tote Bag")
      ).toBeInTheDocument();
    });
  });

  it("displays exactly 2 items in the Clothing category page", async () => {
    render(
      <MemoryRouter initialEntries={["/category/clothing"]}>
        <Routes>
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const itemCards = screen.getAllByTestId("item-card");
      expect(itemCards).toHaveLength(2);
    });
  });

  it("displays exactly 7 items in the Art category page", async () => {
    render(
      <MemoryRouter initialEntries={["/category/art"]}>
        <Routes>
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const itemCards = screen.getAllByTestId("item-card");
      expect(itemCards).toHaveLength(7);
    });
  });
});
