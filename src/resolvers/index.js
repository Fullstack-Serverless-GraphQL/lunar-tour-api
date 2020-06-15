import { hello, getAllListings, getAListing } from "./query";
import { makeABooking } from "./mutation";

export const resolvers = {
  Query: {
    hello: (root, args, context) => hello(args, context),
    getAllListings: (root, args, context) => getAllListings(args, context),
    getAListing: (root, args, context) => getAListing(args, context),
  },
  Mutation: {
    makeABooking: (root, args, context) => makeABooking(args, context),
  },
};
