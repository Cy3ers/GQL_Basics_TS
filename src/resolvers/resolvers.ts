import { User, CreateUserInput, UpdateUserInput, Context } from "../types/types";

export const resolvers = {
  Query: {
    users: (_: any, args: any, context: Context): User[] => context.users,
    user: (_: any, { id }: { id: string }, context: Context): User | undefined =>
      context.users.find((user) => user.id === id)
  },
  Mutation: {
    createUser: (_: any, { input }: { input: CreateUserInput }, context: Context): User => {
      const newUser = { id: String(context.users.length + 1), ...input };
      context.users.push(newUser);
      return newUser;
    },
    updateUser: (_: any, { id, input }: { id: string; input: UpdateUserInput }, context: Context): User | null => {
      const index = context.users.findIndex((user) => user.id === id);
      if (index === -1) return null;

      context.users[index] = { ...context.users[index], ...input };
      return context.users[index];
    },
    deleteUser: (_: any, { id }: { id: string }, context: Context): User | null => {
      const index = context.users.findIndex((user) => user.id === id);
      if (index === -1) return null;

      const deletedUser = context.users.splice(index, 1);
      return deletedUser[0];
    }
  }
};
