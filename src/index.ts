import { startStandaloneServer } from "@apollo/server/standalone";
import { server } from "./server/server.js";
import { Context } from "./types/types.js";
import sequelize from "./config/database.js";
import authMiddleware from "./middleware/auth-middleware.js";

sequelize
  .sync()
  .then(async () => {
    console.log("Models synchronized successfully.");
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }): Promise<Context> => {
        const token = req.headers.authorization || "";
        const user = authMiddleware(token);
        return { user, users: [] };
      },
      listen: { port: 4000 }
    });
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
