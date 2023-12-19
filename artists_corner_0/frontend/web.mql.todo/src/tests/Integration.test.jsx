const { test, expect } = require("@playwright/test");

test.describe("Navigation Tests", () => {
  test("should navigate to the About page and back to Home", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=About");
    expect(await page.textContent("Why we're here")).toBe("About Page");

    await page.click("text=Home");
    expect(await page.textContent("h1")).toBe("Home Page");
  });

  test("should navigate to a Category page", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=Accessories");
    expect(await page.textContent("h1")).toBe("Accessories");
  });
});

test.describe("Functionality Tests", () => {
  test("should display items on category page and navigate to item detail", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/category/Accessories");
    await page.click("text=Item 1");
    expect(await page.textContent("h2")).toBe("Item Detail");
  });
});

//search bar
test.describe("Search Bar Navigation Test", () => {
  test("should allow searching for items", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.fill('input[name="search"]', "earrings");
    await page.press('input[name="search"]', "Enter"); // Simulate pressing Enter

    expect(await page.textContent(".item-card")).toContain("earrings"); // Verify search results
  });
});
