import { MikroORM } from "@mikro-orm/postgresql";

interface IDepsInjector {
  orm: MikroORM;
}

export default IDepsInjector;
