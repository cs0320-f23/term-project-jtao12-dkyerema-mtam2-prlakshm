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
}
