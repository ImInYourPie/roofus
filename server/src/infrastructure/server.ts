import express, { Express, Request, Response, NextFunction } from "express";
import { MikroORM, Property, RequestContext } from "@mikro-orm/core";

import {
  makePropertyController,
  makeUserController,
} from "presentation/controllers";
import { User } from "entities/user.entity";
import options from "./orm.mongo";
import { HttpResponse } from "domain/response";

const app: Express = express();

export const init = async () => {
  const orm = await MikroORM.init(options);

  app.use(express.json());

  app.use((req, res, next) => RequestContext.create(orm.em, next));

  app.use("/user", makeUserController(orm.em.getRepository(User), User).router);
  app.use(
    "/property",
    makePropertyController(orm.em.getRepository(Property), Property).router,
  );

  app.use((req: Request, res: Response) => {
    const response = new HttpResponse({ message: "No route found" }, 404);
    res.status(response.status).send(response);
  });

  app.use(
    (
      err: { message: any; status: number },
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const response = new HttpResponse(
        { message: err.message },
        err.status || 500,
      );
      res.status(response.status).send(response);
    },
  );

  app.listen(3000, () => {
    console.log(`Listening on port 3000`);
  });
};
