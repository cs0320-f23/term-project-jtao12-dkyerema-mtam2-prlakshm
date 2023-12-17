import * as MongoFunctions from "../../src/mongo/Mongo-Functions";

beforeAll(async () => {
  // Call the function to initialize the Stitch client
  await MongoFunctions.initializeStitchClient();
});

//-------------------------------------------------------------------------------------------------------------

describe("getAllItems", () => {
  it("fetches all master and sold items from the database", async () => {
    // Calling function
    const [master_items, sold_items] = await MongoFunctions.getAllItems();

    // Assert master_items and sold_items is defined
    expect(master_items).toBeDefined();
    expect(sold_items).toBeDefined();

    // Assert item[] have all items in database
    expect(master_items).toHaveLength(21);
    expect(sold_items).toHaveLength(21);

    // Assert that all values in master_items are defined
    expect(master_items?.every((item) => item !== undefined)).toBe(true);

    // Assert that all values in sold_items are defined
    expect(sold_items?.every((item) => item !== undefined)).toBe(true);
  });
});

//-------------------------------------------------------------------------------------------------------------

describe("getItemsByCategory", () => {
  it("fetches master and sold items based specific category where both nonempty", async () => {
    // Calling function
    const [crafts_master_items, crafts_sold_items] =
      await MongoFunctions.getItemsByCategory("crafts");

    // Assert master_items and sold_items is defined
    expect(crafts_master_items).toBeDefined();
    expect(crafts_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(crafts_master_items).toHaveLength(13);
    expect(crafts_sold_items).toHaveLength(6);

    // Assert that all values in master_items are defined
    expect(crafts_master_items?.every((item) => item !== undefined)).toBe(true);

    // Assert that all values in sold_items are defined
    expect(crafts_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
  it("fetches master and sold items based specific category where both valid 2", async () => {
    // Calling function
    const [clothing_master_items, clothing_sold_items] =
      await MongoFunctions.getItemsByCategory("clothing");

    // Assert master_items and sold_items is defined
    expect(clothing_master_items).toBeDefined();
    expect(clothing_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(clothing_master_items).toHaveLength(1);
    expect(clothing_sold_items).toHaveLength(1);

    // Assert that all values in master_items are defined
    expect(clothing_master_items?.every((item) => item !== undefined)).toBe(
      true
    );

    // Assert that all values in sold_items are defined
    expect(clothing_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
  it("fetches master and sold items based specific category where both invalid", async () => {
    // Calling function
    const [misc_master_items, misc_sold_items] =
      await MongoFunctions.getItemsByCategory("emptyellaneous");

    // Assert master_items and sold_items is defined
    expect(misc_master_items).toBeDefined();
    expect(misc_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(misc_master_items).toHaveLength(0);
    expect(misc_sold_items).toHaveLength(0);

    // Assert that all values in master_items are defined
    expect(misc_master_items?.every((item) => item !== undefined)).toBe(true);

    // Assert that all values in sold_items are defined
    expect(misc_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
  it("fetches master and sold items based specific category where pass in empty string", async () => {
    // Calling function -- passing in empty string returns all items
    const [empty_master_items, empty_sold_items] =
      await MongoFunctions.getItemsByCategory("");

    // Assert master_items and sold_items is defined
    expect(empty_master_items).toBeDefined();
    expect(empty_sold_items).toBeDefined();

    // Assert item[] have all items in database
    expect(empty_master_items).toHaveLength(21);
    expect(empty_sold_items).toHaveLength(21);

    // Assert that all values in master_items are defined
    expect(empty_master_items?.every((item) => item !== undefined)).toBe(true);

    // Assert that all values in sold_items are defined
    expect(empty_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
});

//-------------------------------------------------------------------------------------------------------------

describe("getItemsBySubcategory", () => {
  it("fetches master and sold items based on specific subcategory where both valid", async () => {
    // Calling function
    const [crochet_master_items, crochet_sold_items] =
      await MongoFunctions.getItemsBySubcategory("crochet");

    // Assert items are defined
    expect(crochet_master_items).toBeDefined();
    expect(crochet_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(crochet_master_items).toHaveLength(6);
    expect(crochet_sold_items).toHaveLength(4);

    // Assert that all values in items are defined
    expect(crochet_master_items?.every((item) => item !== undefined)).toBe(
      true
    );
    expect(crochet_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
  it("fetches master and sold items based on specific subcategory where only master_items valid", async () => {
    // Calling function
    const [secondHand_master_items, secondHand_sold_items] =
      await MongoFunctions.getItemsBySubcategory("second-hand");

    // Assert items are defined
    expect(secondHand_master_items).toBeDefined();
    expect(secondHand_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(secondHand_master_items).toHaveLength(1);
    expect(secondHand_sold_items).toHaveLength(0);

    // Assert that all values in items are defined
    expect(secondHand_master_items?.every((item) => item !== undefined)).toBe(
      true
    );
  });
  it("fetches master and sold items based on specific subcategory where only sold_items valid", async () => {
    // Calling function
    const [handmade_master_items, handmade_sold_items] =
      await MongoFunctions.getItemsBySubcategory("handmade");

    // Assert items are defined
    expect(handmade_master_items).toBeDefined();
    expect(handmade_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(handmade_master_items).toHaveLength(0);
    expect(handmade_sold_items).toHaveLength(1);

    // Assert that all values in sold items are defined
    expect(handmade_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
  it("fetches master and sold items based on specific subcategory where both invalid", async () => {
    // Calling function
    const [knit_master_items, knit_sold_items] =
      await MongoFunctions.getItemsBySubcategory("knit");

    // Assert items are defined
    expect(knit_master_items).toBeDefined();
    expect(knit_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(knit_master_items).toHaveLength(0);
    expect(knit_sold_items).toHaveLength(0);
  });
  it("fetches master and sold items based specific subcategory where pass in empty string", async () => {
    // Calling function -- passing in empty string returns all items
    const [empty_master_items, empty_sold_items] =
      await MongoFunctions.getItemsBySubcategory("");

    // Assert master_items and sold_items is defined
    expect(empty_master_items).toBeDefined();
    expect(empty_sold_items).toBeDefined();

    // Assert item[] have all items in database
    expect(empty_master_items).toHaveLength(21);
    expect(empty_sold_items).toHaveLength(21);

    // Assert that all values in master_items are defined
    expect(empty_master_items?.every((item) => item !== undefined)).toBe(true);

    // Assert that all values in sold_items are defined
    expect(empty_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
});

//-------------------------------------------------------------------------------------------

describe("getItemsByCategoryAndSubcategory", () => {
  it("fetches items based on specific category and subcategory where valid for master_items and sold_items", async () => {
    // Calling function
    const [jewelry_master_items, jewelry_sold_items] =
      await MongoFunctions.getItemsByCategoryAndSubcategory(
        "accessories",
        "jewelry"
      );

    // Assert items are defined
    expect(jewelry_master_items).toBeDefined();
    expect(jewelry_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(jewelry_master_items).toHaveLength(3);
    expect(jewelry_sold_items).toHaveLength(8);

    // Assert that all values in items are defined
    expect(jewelry_master_items?.every((item) => item !== undefined)).toBe(
      true
    );
    expect(jewelry_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
  it("fetches items based on specific category and subcategory where only valid for sold_items", async () => {
    // Calling function
    const [drawing_master_items, drawing_sold_items] =
      await MongoFunctions.getItemsByCategoryAndSubcategory("art", "drawing");

    // Assert items are defined
    expect(drawing_master_items).toBeDefined();
    expect(drawing_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(drawing_master_items).toHaveLength(0);
    expect(drawing_sold_items).toHaveLength(1);

    // Assert that all values in items are defined
    expect(drawing_sold_items?.every((item) => item !== undefined)).toBe(true);
  });
  it("fetches items based on specific category and invalid subcategory 'sculpture'", async () => {
    // Calling function
    const [sculpture_master_items, sculpture_sold_items] =
      await MongoFunctions.getItemsByCategoryAndSubcategory("art", "sculpture");

    // Assert items are defined
    expect(sculpture_master_items).toBeDefined();
    expect(sculpture_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(sculpture_master_items).toHaveLength(0);
    expect(sculpture_sold_items).toHaveLength(0);
  });
  it("fetches items based on specific category and empty subcategory string", async () => {
    // Calling function -- returns all items in category
    const [emptySubcategory_master_items, emptySubcategory_sold_items] =
      await MongoFunctions.getItemsByCategoryAndSubcategory("clothing", "");

    // Assert items are defined
    expect(emptySubcategory_master_items).toBeDefined();
    expect(emptySubcategory_sold_items).toBeDefined();

    // Assert item[] have respective items in database
    expect(emptySubcategory_master_items).toHaveLength(1);
    expect(emptySubcategory_sold_items).toHaveLength(1);

    // Assert that all values in items are defined
    expect(
      emptySubcategory_master_items?.every((item) => item !== undefined)
    ).toBe(true);
    expect(
      emptySubcategory_sold_items?.every((item) => item !== undefined)
    ).toBe(true);
  });
});

//------------------------------------------------------------------------------------------------------------

describe("getItemsByCategory and getItemsByCategoryAndSubcategory", () => {
  it("fetches master and sold items based on category and empty subcategory string", async () => {
    // Calling functions
    const [clothing_master, clothing_sold] =
      await MongoFunctions.getItemsByCategory("clothing");
    const [emptySubcategory_master, emptySubcategory_sold] =
      await MongoFunctions.getItemsByCategoryAndSubcategory("clothing", "");

    // Assert master and sold items are defined
    expect(clothing_master).toBeDefined();
    expect(clothing_sold).toBeDefined();
    expect(emptySubcategory_master).toBeDefined();
    expect(emptySubcategory_sold).toBeDefined();

    // Assert master and sold item[] have respective items in database
    expect(clothing_master).toHaveLength(1);
    expect(clothing_sold).toHaveLength(1);
    expect(emptySubcategory_master).toHaveLength(1);
    expect(emptySubcategory_sold).toHaveLength(1);

    // Assert that all values in master and sold items are defined
    expect(clothing_master?.every((item) => item !== undefined)).toBe(
      true
    );
    expect(clothing_sold?.every((item) => item !== undefined)).toBe(
      true
    );
    expect(
      emptySubcategory_master?.every((item) => item !== undefined)
    ).toBe(true);
    expect(
      emptySubcategory_sold?.every((item) => item !== undefined)
    ).toBe(true);

    // Assert that master items are the same
    if (emptySubcategory_master && emptySubcategory_sold) {
      expect(clothing_master).toEqual(
        expect.arrayContaining(emptySubcategory_master)
      );

      // Assert that sold items are the same

      expect(clothing_sold).toEqual(
        expect.arrayContaining(emptySubcategory_sold)
      );
    }
  });
  it("fetches master and sold items based on empty category and subcategory strings", async () => {
    // Calling functions
    const [emptyCategory_master, emptyCategory_sold] =
      await MongoFunctions.getItemsByCategory("");
    const [
      empty_master,
      empty_sold,
    ] = await MongoFunctions.getItemsByCategoryAndSubcategory("", "");

    // Assert master and sold items are defined
    expect(emptyCategory_master).toBeDefined();
    expect(emptyCategory_sold).toBeDefined();
    expect(empty_master).toBeDefined();
    expect(empty_sold).toBeDefined();

    // Assert master and sold item[] have respective items in database
    expect(emptyCategory_master).toHaveLength(21);
    expect(emptyCategory_sold).toHaveLength(21);
    expect(empty_master).toHaveLength(21);
    expect(empty_sold).toHaveLength(21);

    // Assert that all values in master and sold items are defined
    expect(emptyCategory_master?.every((item) => item !== undefined)).toBe(
      true
    );
    expect(emptyCategory_sold?.every((item) => item !== undefined)).toBe(true);
    expect(
      empty_master?.every((item) => item !== undefined)
    ).toBe(true);
    expect(
      empty_sold?.every((item) => item !== undefined)
    ).toBe(true);

    if (
      empty_master &&
      empty_sold
    ) {
      // Assert that master items are the same
      expect(emptyCategory_master).toEqual(
        expect.arrayContaining(empty_master)
      );

      // Assert that sold items are the same
      expect(emptyCategory_sold).toEqual(
        expect.arrayContaining(empty_sold)
      );
    }
  });
});
