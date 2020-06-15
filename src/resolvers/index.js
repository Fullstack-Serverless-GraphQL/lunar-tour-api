import { hello, getAllListings } from "./query";

export const resolvers = {
  Query: {
    hello: (root, args, context) => hello(args, context),
    getAllListings: (root, args, context) => getAllListings(args, context),
  },
};
