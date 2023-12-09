import { ObjectId } from "mongodb";

export default class Item {
  constructor(
    public title: string,
    public description: string,
    public seller: ObjectId,
    public category: string,
    public subcategory: string,
    public price: number,
    public timestamp: Date,
    public photoFilenames: string[],
    public ifSold: boolean,
    public _id?: ObjectId
  ) {}
}
