import { BSON } from "mongodb-stitch-browser-sdk";

export default class Account {
  constructor(
    public username: string,
    public fullname: string,
    public email: string,
    public bio: string,
    public currentListing_ids: BSON.ObjectId[],
    public pastListing_ids: BSON.ObjectId[],
    public purchasedItem_ids: BSON.ObjectId[],
    public likedItem_ids: BSON.ObjectId[],
    public profilePhotoFilename: string,
    public contactInformation: Map<String, String>,
    public _id?: BSON.ObjectId
  ) {}
}
