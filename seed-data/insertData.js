/*

this function will allow us to add all the listings into Dynamo dynamically
*/

//set up the aws-sdk
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();

//import the listings json
const listings = require("./listings.json");
console.log("Listings.Init", listings);

//lets inseert them into the table
//loop over the listings
listings.map((l) => {
  //create params object
  listingParams = {
    TableName: "dev-lunar-listings",
    Item: {
      coverPhoto: l.coverPhoto,
      guide: {
        avatar: l.guide.avatar,
        bio: l.guide.bio,
        name: l.guide.name,
      },
      listingActivities: l.listingActivities,
      listingDescription: l.listingDescription,
      listingId: l.listingId,
      listingLocation: l.listingLocation,
      listingName: l.listingName,
      listingType: l.listingType,
      numberOfDays: l.numberOfDays,
      price: l.price,
      rating: l.rating,
      specialAmount: l.specialAmount,
      specialType: l.specialType,
    },
  };

  //put the data into the table

  docClient.put(listingParams, function (err, data) {
    if (err) {
      console.error(
        "Unable to add listing",
        user.name,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:");
    }
  });
});
