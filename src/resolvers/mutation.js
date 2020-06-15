import { v1 as uuidv1 } from "uuid";
import stripePackage from "stripe";
import dynamodb from "../../libs/dynamodb-lib";

export const makeABooking = async (args, context) => {
  //Get the listing that the user selected
  //from the client
  const getPrices = async () => {
    const params = {
      TableName: process.env.ListingsDB || "dev-lunar-listings",
      KeyConditionExpression: "listingId = :listingId",
      ExpressionAttributeValues: {
        ":listingId": args.listingId,
      },
    };
    try {
      const listings = await dynamodb.query(params);
      return listings;
    } catch (e) {
      return e;
    }
  };

  //set the listing to a variables so we can resuse it
  const listingObject = await getPrices();

  //caLCULATE THE amount to be charged to the
  //customers card

  const bookingCharge =
    parseInt(listingObject.Items[0].price) * args.customers.length;
  //get the name of the listing

  const listingName = listingObject.listingName;
  //create an instance of the stripe lib

  const stripe = stripePackage(process.env.stripeSecretKey);

  //charge the users card

  const stripeResult = await stripe.charges.create({
    source: "tok_visa",
    amount: bookingCharge,
    description: `Charge for booking of listing ${args.listingId}`,
    currency: "usd",
  });

  //create the booking in the table
  const params = {
    TableName: process.env.BookingsDB || "dev-lunar-bookings",
    Item: {
      bookingId: uuidv1(),
      listingId: args.listingId,
      bookingDate: args.bookingDate,
      size: args.customers.length > 0 ? args.customers.length : 0,
      bookingTotal: bookingCharge,
      customerEmail: args.customerEmail,
      customers: args.customers,
      createdTimestamp: Date.now(),
      chargeReciept: stripeResult.receipt_url,
      paymentDetails: stripeResult.payment_method_details,
    },
  };
  try {
    //insert the booking into the table
    await dynamodb.put(params);

    return {
      bookingId: params.Item.bookingId,
      listingId: params.Item.listingId,
      bookingDate: params.Item.bookingDate,
      size: params.Item.size,
      bookingTotal: params.Item.bookingTotal,
      customerEmail: params.Item.customerEmail,
      customers: params.Item.customers.map((c) => ({
        name: c.name,
        surname: c.surname,
        country: c.country,
        passportNumber: c.passportNumber,
        physioScore: c.physioScore,
      })),
      chargeReciept: params.Item.chargeReciept,
    };
  } catch (e) {
    return e;
  }
};
