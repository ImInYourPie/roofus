import "dotenv/config";
import IEnv from "interfaces/env.interface";

const Env: IEnv = {
  mongo: {
    uri: process.env.MONGO_URI as string,
  },
  isDev: process.env.NODE_ENV === "dev",
  isProd: process.env.NODE_ENV === "prod",
  isTest: process.env.NODE_ENV === "test",
};

export default Env;
