import { Options } from "@mikro-orm/core";

import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import config from "config/index";
import { User } from "entities/user.entity";
import { Property } from "entities/property.entity";

const options: Options = {
  type: "mongo",
  entities: [User, Property],
  dbName: "roofus",
  clientUrl: config.mongo.uri,
  highlighter: new MongoHighlighter(),
  debug: true,
};

export default options;
