import { BSON } from "mongodb-stitch-browser-sdk";

export default class Item {
  constructor(
    public title: string,
    public description: string,
    public seller: string,
    public category: string,
    public subcategory: string,
    public price: number,
    public timestamp: Date,
    public photoFilenames: string[],
    public ifSold: boolean,
    public _id?: BSON.ObjectId
  ) {}

  /**
   * Converts object return from MongoDB to item
   * @param itemData object from MongoDB database
   * @returns object as an item
   */
  static fromObject(itemData: Record<string, any>): Item | undefined {
    if (itemData) {
      return new Item(
        itemData.title,
        itemData.description,
        itemData.seller,
        itemData.category,
        itemData.subcategory,
        itemData.price,
        new Date(itemData.timestamp),
        itemData.photoFilenames,
        itemData.ifSold,
        itemData._id
      );
    } else {
      return undefined;
    }
  }
}
