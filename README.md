# term-project-jtao12-dkyerema-mtam2-prlakshm-

# Project Details

### Project Name: Artist's Corner PVD

### Project Description:
This consignment site is a place for Brown and RISD students to sell their handmade goods and clothes second-hand. They can sign in with their school gmail, post their own listings, and view other people's listings. On the home page, there is an events banner to see upcoming events in the PVD art community!

### Team Members: 
<span style="color:#75BFEC;">Full Name - Github Username - Contribution</span>
<br>Dorinda Kyerema - dkyerema - frontend
<br>Jeffrey Tao - jtao - frontend
<br>Marissa Tam - mtam2 - frontend
<br>Pranavi Lakshminarayanan - prlakshm - backend

### Link to Repo: https://github.com/cs0320-f23/term-project-jtao12-dkyerema-mtam2-prlakshm

# Design Choices:

We decided to use a database to store our backend data so that we can use Mongo's built-in search and filter functions. We also wanted to bee our backend data secure and to avoid hosting a http server, so we used MongoDB to take care of the security for us. 

We decided to represent items as an `Item` class objects and accounts as `Account` class objects. In the Mongo database, there is an `accounts` collection, a `master_items` collection, and a `sold_items` collection. We decided to seperate the sold items and master (currently selling) items so that they can be returned seperately. When sorting by price, most recent listing, or searching by keywords, this ensures that master items and sold items are sorted seperately. Master items are displayed at the top of the website and the sold items are displayed below. 

<span style="color:#FE8181;">***Note: MongoDB uses the BSON.ObjectId data type to assigned a unique id to each document object in its collections.***

We used Stitch to host our Mongo API. The Stitch App allows us to use an API key (gitignored and stored in the private folder) to access the database and search/filter/modify the data. 

We wrote async functions seperately from the react `.tsx` components so that all the functions that access the Mongo database are in one place. There are special notations for Mongo functions, so it made sense to seperat them from the HTML/typescript component files. This way, all the funcitons can be imported as once a not take up room in the components scripts. 

# Errors/Bugs:

When data is fetched from the MongoDB database, items and accounts are returned as document objects. If you want the return to be an item, `Item.fromObject(item)` or `Account.fromObject(account)` must be used to convert the object to an Item or Account type. 

If keeping the return as an object then for the fields strings remain as strings, numbers remain as numbers, ids remain as ids, lists remain as lists, but maps return as objects. This is because MongoDB does not support the `Map` data type. So, the contact information field for accounts return as objects and not maps. To avoid this, we recommend converting the entire object to an account first (as done in testing).

# Tests:

## Jest Testing

<span style="color:#75BFEC;">tests/mongo</span>
<br>access-mongo-functions.test.ts
<br>This test suite tests all the Mongo functions that access the database to find subsets of the items and accounts data. This includes the functions responsible for search and filter. 

<br>modify-mongo-functions.test.ts
<br>This test suite tests all the Mongo functions that modify the database. This test suite adds new items/accounts, updates items/accounts, and deletes items/accounts. There are only a few tests because we didn't want to disrupt the mocked database data too much. 

<br>misc-mongo-functions.test.ts
<br>This test suite tests any miscellaneous Mongo functions. It inlcudes fuzz tests for `getAllUsernames()` and `ifUsernameAlreadyExists()`.

## Playwright Testing


# How To:

