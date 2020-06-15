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
  return null;
};
