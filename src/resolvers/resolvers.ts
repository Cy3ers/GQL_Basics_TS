import { User as UserType, CreateUserInput, UpdateUserInput, Context } from "../types/types";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET || "Backup Secret";

export const resolvers = {
  Query: {
    users: async (_: any, args: any, context: Context) => {
      const users = await User.findAll();
      return users;
    },
    user: (_: any, { id }: { id: string }, context: Context): UserType | undefined =>
      context.users.find((user) => user.id === id)
  },
  Mutation: {
    register: async (_: any, { input }: { input: CreateUserInput }) => {
      const { name, email, password } = input;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });

      return newUser;
    },

    login: async (_: any, { name, password }: { name: string; password: string }) => {
      const user = await User.findOne({ where: { name } });
      if (!user) throw new Error("Invalid email or password.");

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error("Invalid email or password.");

      const token = jwt.sign({ id: user.id, name: user.name }, secret, { expiresIn: "1h" });

      return { token, user };
    },
    // updateUser: (_: any, { id, input }: { id: string; input: UpdateUserInput }, context: Context): User | null => {
    //   const index = context.users.findIndex((user) => user.id === id);
    //   if (index === -1) return null;

    //   context.users[index] = { ...context.users[index], ...input };
    //   return context.users[index];
    // },
    deleteUser: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const deletedUser = await User.destroy({ where: { id } });

      if (deletedUser === 0) {
        throw new Error("User not found");
      }

      return "User deleted successfully.";
    }
  }
};
