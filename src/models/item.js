"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Item = /** @class */ (function () {
    function Item(title, description, seller, category, subcategory, price, timestamp, photoFilenames, ifSold, id) {
        this.title = title;
        this.description = description;
        this.seller = seller;
        this.category = category;
        this.subcategory = subcategory;
        this.price = price;
        this.timestamp = timestamp;
        this.photoFilenames = photoFilenames;
        this.ifSold = ifSold;
        this.id = id;
    }
    return Item;
}());
exports.default = Item;
