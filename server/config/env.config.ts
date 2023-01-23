import dotenv from "dotenv";
dotenv.config();

import { IEnv } from "interfaces";

const Env: IEnv = {
  db: {
    host: process.env.DB_HOST as string,
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    migrationsDir: process.env.DB_MIGRATIONS_DIR as string,
    port: process.env.DB_PORT as string,
  },
  isDev: process.env.NODE_ENV === "dev",
  isProd: process.env.NODE_ENV === "prod",
  isTest: process.env.NODE_ENV === "test",
};

export default Env;
