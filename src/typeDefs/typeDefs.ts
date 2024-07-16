export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthPayLoad {
    user: User!
    token: String!
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    register(input: CreateUserInput!): User!
    login(name: String!, password: String!): AuthPayLoad!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): String!
  }
`;
