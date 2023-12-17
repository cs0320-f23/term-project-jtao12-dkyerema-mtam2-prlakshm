"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItems = exports.getItemsBySubcategory = exports.getItemsByCategoryAndSubcategory = exports.getItemsByCategory = exports.getAllItems = exports.initializeStitchClient = void 0;
// Mongo-Functions.ts
var mongodb_stitch_browser_sdk_1 = require("mongodb-stitch-browser-sdk");
var client;
var mongodb;
/**
 * Call this function ONCE at the begginging of a .tsx file to connect to the client.
 * Will error if run this method multiple times (cannot connect to client multiple times).
 */
var initializeStitchClient = function () {
    if (!client) {
        var appId = "artists_corner_0-lcspi";
        client = mongodb_stitch_browser_sdk_1.Stitch.hasAppClient(appId)
            ? mongodb_stitch_browser_sdk_1.Stitch.getAppClient(appId)
            : mongodb_stitch_browser_sdk_1.Stitch.initializeAppClient(appId);
        mongodb = client.getServiceClient(mongodb_stitch_browser_sdk_1.RemoteMongoClient.factory, "mongodb-atlas");
    }
};
exports.initializeStitchClient = initializeStitchClient;
/**
 * Retrieve all items from database
 * @returns tuple of [masterItems, soldItems] of all items
 */
function getAllItems() {
    return __awaiter(this, void 0, void 0, function () {
        var db, masterItemsCollection, masterItemsCursor, master_Items, soldItemsCollection, soldItemsCursor, sold_Items, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.auth.loginWithCredential(new mongodb_stitch_browser_sdk_1.UserApiKeyCredential("iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN")))];
                case 1:
                    _a.sent();
                    db = mongodb === null || mongodb === void 0 ? void 0 : mongodb.db("artists_corner_pvd");
                    if (!db) {
                        throw new Error("Database not available");
                    }
                    masterItemsCollection = db.collection("master_items");
                    masterItemsCursor = masterItemsCollection.find();
                    return [4 /*yield*/, masterItemsCursor.toArray()];
                case 2:
                    master_Items = _a.sent();
                    soldItemsCollection = db.collection("sold_items");
                    soldItemsCursor = soldItemsCollection.find();
                    return [4 /*yield*/, soldItemsCursor.toArray()];
                case 3:
                    sold_Items = _a.sent();
                    return [2 /*return*/, [master_Items, sold_Items]];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching items:", error_1);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllItems = getAllItems;
/**
 * Retrieves items from database from a specific category
 * @param category string (insensitive) of category want to search for
 * @returns tuple of [masterItems, soldItems] of items in that category
 */
function getItemsByCategory(category) {
    return __awaiter(this, void 0, void 0, function () {
        var db, masterItemsCollection, masterCategoryItemsCursor, masterCategoryItems, soldItemsCollection, soldCategoryItemsCursor, soldCategoryItems, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.auth.loginWithCredential(new mongodb_stitch_browser_sdk_1.UserApiKeyCredential("iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN")))];
                case 1:
                    _a.sent();
                    db = mongodb === null || mongodb === void 0 ? void 0 : mongodb.db("artists_corner_pvd");
                    if (!db) {
                        throw new Error("Database not available");
                    }
                    masterItemsCollection = db.collection("master_items");
                    masterCategoryItemsCursor = masterItemsCollection.find({
                        category: { $regex: category, $options: "i" },
                    });
                    return [4 /*yield*/, masterCategoryItemsCursor.toArray()];
                case 2:
                    masterCategoryItems = _a.sent();
                    soldItemsCollection = db.collection("sold_items");
                    soldCategoryItemsCursor = soldItemsCollection.find({
                        category: { $regex: category, $options: "i" },
                    });
                    return [4 /*yield*/, soldCategoryItemsCursor.toArray()];
                case 3:
                    soldCategoryItems = _a.sent();
                    return [2 /*return*/, [masterCategoryItems, soldCategoryItems]];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error fetching items:", error_2);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getItemsByCategory = getItemsByCategory;
/**
 * Retrieves items from database from a specific category and subcategory
 * @param category string (insensitive) of category want to search for
 * @param subcategory string (insensitive) of subcatefory want to search for -- must be INSIDE
 * category, or list will be empty, because searches for both category and subcategory match
 * @returns tuple of [masterItems, soldItems] of items in that category
 */
function getItemsByCategoryAndSubcategory(category, subcategory) {
    return __awaiter(this, void 0, void 0, function () {
        var db, masterItemsCollection, masterCategoryAndSubcategoryItemsCursor, masterCategoryAndSubcategoryItems, soldItemsCollection, soldCategoryAndSubcategoryItemsCursor, soldCategoryAndSubcategoryItems, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.auth.loginWithCredential(new mongodb_stitch_browser_sdk_1.UserApiKeyCredential("iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN")))];
                case 1:
                    _a.sent();
                    db = mongodb === null || mongodb === void 0 ? void 0 : mongodb.db("artists_corner_pvd");
                    if (!db) {
                        throw new Error("Database not available");
                    }
                    masterItemsCollection = db.collection("master_items");
                    masterCategoryAndSubcategoryItemsCursor = masterItemsCollection.find({
                        category: { $regex: category, $options: "i" },
                        subcategory: { $regex: subcategory, $options: "i" },
                    });
                    return [4 /*yield*/, masterCategoryAndSubcategoryItemsCursor.toArray()];
                case 2:
                    masterCategoryAndSubcategoryItems = _a.sent();
                    soldItemsCollection = db.collection("sold_items");
                    soldCategoryAndSubcategoryItemsCursor = soldItemsCollection.find({
                        category: { $regex: category, $options: "i" },
                        subcategory: { $regex: subcategory, $options: "i" },
                    });
                    return [4 /*yield*/, soldCategoryAndSubcategoryItemsCursor.toArray()];
                case 3:
                    soldCategoryAndSubcategoryItems = _a.sent();
                    return [2 /*return*/, [masterCategoryAndSubcategoryItems, soldCategoryAndSubcategoryItems]];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error fetching items:", error_3);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getItemsByCategoryAndSubcategory = getItemsByCategoryAndSubcategory;
/**
 * Retrieves items from database from a ONLY a subcategory
 * @param subcategory string (insensitive) of subcategory want to search for
 * @returns tuple of [masterItems, soldItems] of items in that subcategory
 */
function getItemsBySubcategory(subcategory) {
    return __awaiter(this, void 0, void 0, function () {
        var db, masterItemsCollection, masterSubcategoryItemsCursor, masterSubcategoryItems, soldItemsCollection, soldSubcategoryItemsCursor, soldSubcategoryItems, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.auth.loginWithCredential(new mongodb_stitch_browser_sdk_1.UserApiKeyCredential("iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN")))];
                case 1:
                    _a.sent();
                    db = mongodb === null || mongodb === void 0 ? void 0 : mongodb.db("artists_corner_pvd");
                    if (!db) {
                        throw new Error("Database not available");
                    }
                    masterItemsCollection = db.collection("master_items");
                    masterSubcategoryItemsCursor = masterItemsCollection.find({
                        subcategory: { $regex: subcategory, $options: "i" },
                    });
                    return [4 /*yield*/, masterSubcategoryItemsCursor.toArray()];
                case 2:
                    masterSubcategoryItems = _a.sent();
                    soldItemsCollection = db.collection("sold_items");
                    soldSubcategoryItemsCursor = soldItemsCollection.find({
                        subcategory: { $regex: subcategory, $options: "i" },
                    });
                    return [4 /*yield*/, soldSubcategoryItemsCursor.toArray()];
                case 3:
                    soldSubcategoryItems = _a.sent();
                    return [2 /*return*/, [masterSubcategoryItems, soldSubcategoryItems]];
                case 4:
                    error_4 = _a.sent();
                    console.error("Error fetching items:", error_4);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getItemsBySubcategory = getItemsBySubcategory;
/**
 * Retrieves items from database from based on search string
 * @param keyword string (insensitive) of keyword(s) want to search for
 * @returns tuple of [masterItems, soldItems] of items in with that keyword
 */
function searchItems(keywords) {
    return __awaiter(this, void 0, void 0, function () {
        var db, keywordRegex, dollarAmount, masterItemsCollection, masterSearchQuery, masterItemsCursor, masterSearchResults, soldItemsCollection, soldSearchQuery, soldItemsCursor, soldSearchResults, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.auth.loginWithCredential(new mongodb_stitch_browser_sdk_1.UserApiKeyCredential("iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN")))];
                case 1:
                    _a.sent();
                    db = mongodb === null || mongodb === void 0 ? void 0 : mongodb.db("artists_corner_pvd");
                    if (!db) {
                        throw new Error("Database not available");
                    }
                    keywordRegex = { $regex: keywords, $options: "i" };
                    dollarAmount = parseInt(keywords.replace(/\$([\d]+)(\.\d{1,2})?/, ''));
                    masterItemsCollection = db.collection("master_items");
                    masterSearchQuery = {
                        $or: [
                            { title: keywordRegex },
                            { description: keywordRegex },
                            { category: keywordRegex },
                            { subcategory: keywordRegex },
                            { seller: keywordRegex },
                            { price: { $gt: dollarAmount - 1, $lt: dollarAmount + 1 } },
                        ],
                    };
                    masterItemsCursor = masterItemsCollection.find(masterSearchQuery);
                    return [4 /*yield*/, masterItemsCursor.toArray()];
                case 2:
                    masterSearchResults = _a.sent();
                    soldItemsCollection = db.collection("sold_items");
                    soldSearchQuery = {
                        $or: [
                            { title: keywordRegex },
                            { description: keywordRegex },
                            { category: keywordRegex },
                            { subcategory: keywordRegex },
                            { seller: keywordRegex }, //update all sellers to link to username instead from json
                            { price: { $gt: dollarAmount - 1, $lt: dollarAmount + 1 } },
                        ],
                    };
                    soldItemsCursor = soldItemsCollection.find(soldSearchQuery);
                    return [4 /*yield*/, soldItemsCursor.toArray()];
                case 3:
                    soldSearchResults = _a.sent();
                    return [2 /*return*/, [masterSearchResults, soldSearchResults]];
                case 4:
                    error_5 = _a.sent();
                    console.error("Error fetching items:", error_5);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.searchItems = searchItems;
/**
 * Add functions for:
 * filter by price, timestamp from [item[], item[]]
 * accounts get by id, get by username
 * item get by id
 * if username already exists
 * add item/add account
 * remove item -- add to sold/remove account
 */ 
