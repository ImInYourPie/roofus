import express, { Express } from "express";
import dotenv from "dotenv";

import initDB from "./orm.config";

dotenv.config();

const app: Express = express();

(async (): Promise<void> => {
  await initDB();
})();

app.use("/user");

export default app;
