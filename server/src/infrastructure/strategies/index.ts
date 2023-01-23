import passport from "passport";
import { HttpError } from "entities";

import JWTStrategy from "./jwt.strategy";

const jwtStrategy = new JWTStrategy(passport, new HttpError(500, {}));

export { jwtStrategy };
