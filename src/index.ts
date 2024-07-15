import { startStandaloneServer } from "@apollo/server/standalone";
import { server } from "./server/server.js";
import { users } from "./mock/data.js";

const { url } = await startStandaloneServer(server, {
  context: async () => ({ users }),
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);
