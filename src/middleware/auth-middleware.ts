// ./src/middleware/auth-middleware.ts

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET || "Backup Secret";

interface DecodedToken {
  id: number;
  name: string;
}

const authMiddleware = (token: string): DecodedToken | null => {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret) as DecodedToken;
    return decoded;
  } catch (err) {
    console.error("Invalid token.");
    return null;
  }
};

export default authMiddleware;
