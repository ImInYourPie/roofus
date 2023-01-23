import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";
import config from "./env.config";

const options: Options<PostgreSqlDriver> = {
  metadataProvider: ReflectMetadataProvider,
  entities: ["./dist/domain/entities"],
  entitiesTs: ["./src/domain/entities"],
  dbName: config.db.name,
  host: config.db.host,
  type: "postgresql",
  port: 5432,
  migrations: {
    allOrNothing: true,
    path: path.join(process.cwd(), "dist/src/migrations"),
    pathTs: path.join(process.cwd(), "src/migrations"),
  },
};

export default options;
