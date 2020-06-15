const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const listings = require("./listings.json");
console.log("Listings.Init", listings);

//lets inseert them into the table

listings.map((l) => {
  listingParams = {};
});
