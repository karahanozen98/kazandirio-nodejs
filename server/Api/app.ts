import "reflect-metadata";
import dotenv from "dotenv";
import server from "./config/server.js";
import DBConnection from "./config/Connection.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const result = dotenv.config({ path: `${__dirname}/../../.env` });

if (result.error) {
  throw result.error;
}

const port = process.env.PORT || 5001;
const uri = process.env.ATLAS_URI || "";

//mongoDb connection
DBConnection(uri)
  .then(() => {
    server.listen(port, () => {
      console.log("Connection established");
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });
