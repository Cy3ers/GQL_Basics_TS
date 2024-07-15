import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../typeDefs/typeDefs.js";
import { resolvers } from "../resolvers/resolvers.js";
import { Context } from "../types/types";

export const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
});
