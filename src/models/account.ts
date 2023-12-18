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

  static fromObject(accountData: Record<string, any>): Account | undefined {
    if (accountData) {
      const contactInformation = new Map<string, string>(
        Object.entries(accountData.contactInformation || {}).map(([key, value]) => [key, String(value)])
      );
      return new Account(
        accountData.username,
        accountData.fullname,
        accountData.email,
        accountData.bio,
        accountData.currentListing_ids,
        accountData.pastListing_ids,
        accountData.purchasedItem_ids,
        accountData.likedItem_ids,
        accountData.profilePhotoFilename,
        contactInformation,
        accountData._id
      );
    } else {
      return undefined;
    }
  }
}
