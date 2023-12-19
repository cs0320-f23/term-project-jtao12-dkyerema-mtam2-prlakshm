const { test, expect } = require("@playwright/test");

test.describe("Navigation Tests", () => {
  test("should navigate to the About page and back to Home", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=About"); // Replace with link's text or selector
    expect(await page.textContent("h1")).toBe("About Page"); // Adjust the selector and text

    await page.click("text=Home"); // Replace with link's text or selector
    expect(await page.textContent("h1")).toBe("Home Page"); // Adjust the selector and text
  });

  test("should navigate to a Category page", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=Accessories"); // Adjust the category name
    expect(await page.textContent("h1")).toBe("Accessories"); // Adjust the category name
  });
});

test.describe("Functionality Tests", () => {
  test("should display items on category page and navigate to item detail", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/category/Accessories");
    await page.click("text=Item 1"); // Adjust for an actual item's name or selector
    expect(await page.textContent("h2")).toBe("Item Detail"); // Adjust for the item detail header

    // write more tests on item details...
  });

  // ... write more tests on functionality ...
});

//search bar
test.describe("Search Bar Navigation Test", () => {
  test("should allow searching for items", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.fill('input[name="search"]', "earrings"); // Adjust the selector and search term
    await page.press('input[name="search"]', "Enter"); // Simulate pressing Enter

    expect(await page.textContent(".item-card")).toContain("earrings"); // Verify search results
  });

  // ... More form interaction tests ...
});
