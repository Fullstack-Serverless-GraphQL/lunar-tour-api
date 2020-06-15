import dynamodb from "../../libs/dynamodb-lib";
export const hello = (args, context) => {
  return "Your GraphQL API is now LIVE!🎈 ";
};

export const getAllListings = async (args, context) => {
  const params = {
    TableName: process.env.ListingsDB || "dev-listings",
  };

  try {
    const result = await dynamodb.scan(params);

    if (result.Items.length === 0) {
      return "You have no listings";
    } else {
      return result.Items.map((i) => ({
        listingId: i.listingId,
        coverPhoto: i.coverPhoto,
        listingName: i.listingName,
        listingDescription: i.listingDescription,
        listingType: i.listingType.map((m) => ({
          name: m,
        })),
        listingLocation: i.listingLocation,
        listingActivities: i.listingActivities.map((k) => ({
          name: k,
        })),
        specialType: i.specialType,
        specialAmount: i.specialAmount,
        rating: i.rating,
        guide: {
          Name: i.guide.name,
          Bio: i.guide.bio,
          Avatar: i.guide.avatar,
        },
        price: i.price,
        numberOfDays: i.numberOfDays,
      }));
    }

    // return result;
  } catch (e) {
    return {
      message: e.message,
      code: "500x",
    };
  }
};

export const getAListing = async (args, context) => {
  const params = {
    TableName: process.env.ListingsDB || "dev-listings",
    FilterExpression: "listingId = :listingId",
    ExpressionAttributeValues: {
      ":listingId": args.listingId,
    },
  };

  try {
    const listing = await dynamoDBLib.call("scan", params);

    console.log(listing);

    if (listing.Items.length === 0) {
      return "There is no listing";
    } else {
      return {
        listingName: listing.Items[0].listingName,

        listingId: listing.Items[0].listingId,
        coverPhoto: listing.Items[0].coverPhoto,
        listingDescription: listing.Items[0].listingDescription,
        listingType: listing.Items[0].listingType.map((m) => ({
          name: m,
        })),
        listingLocation: listing.Items[0].listingLocation,
        listingActivities: listing.Items[0].listingActivities.map((k) => ({
          name: k,
        })),
        specialType: listing.Items[0].specialType,
        specialAmount: listing.Items[0].specialAmount,
        rating: listing.Items[0].rating,
        guide: {
          Name: listing.Items[0].guide.name,
          Bio: listing.Items[0].guide.bio,
          Avatar: listing.Items[0].guide.avatar,
        },
        price: listing.Items[0].price,
        numberOfDays: listing.Items[0].numberOfDays,
      };
    }
  } catch (e) {
    return {
      message: e.message,
      code: "500x",
    };
  }
};
