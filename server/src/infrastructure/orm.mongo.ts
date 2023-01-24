import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import config from "config/index";
import { UserEntity } from "entities/user.entity";

const options: Options = {
  type: "mongo",
  entities: [UserEntity],
  dbName: "roofus",
  clientUrl: config.mongo.uri,
  highlighter: new MongoHighlighter(),
  debug: true,
};

export default options;
