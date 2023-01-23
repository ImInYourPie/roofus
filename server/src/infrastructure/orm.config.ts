import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";

import config from "config";

const init = async (): Promise<MikroORM> => {
  const orm = await MikroORM.init<PostgreSqlDriver>(config.database);

  const migrator = orm.getMigrator();
  await migrator.up();

  return orm;
};

export default init;
