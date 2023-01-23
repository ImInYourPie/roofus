import express, { Express } from "express";
import dotenv from "dotenv";

import initDb from "./orm.config";

dotenv.config();

const app: Express = express();

(async (): Promise<void> => {
  await initDb();
})();

export default app;
