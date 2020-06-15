import { hello, getAllListings, getAListing } from "./query";

export const resolvers = {
  Query: {
    hello: (root, args, context) => hello(args, context),
    getAllListings: (root, args, context) => getAllListings(args, context),
    getAListing: (root, args, context) => getAListing(args, context),
  },
};
