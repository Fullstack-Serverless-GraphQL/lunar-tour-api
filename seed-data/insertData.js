const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const listings = require("./listings.json");
console.log("Listings.Init", listings);

//lets inseert them into the table

listings.map((l) => {
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
});
