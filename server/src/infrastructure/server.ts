import express, { Express, Request, Response, NextFunction } from "express";
import { MikroORM, RequestContext } from "@mikro-orm/core";

import {
  makeAdminController,
  makeOpenhouseController,
  makePropertyController,
  makeUserController,
} from "presentation/controllers";
import { User } from "entities/user.entity";
import { Property } from "entities/property.entity";
import options from "./orm.mongo";
import config from "config";
import { HttpResponse } from "domain/response";
import { Admin } from "entities/admin.entity";
import { Openhouse } from "entities/openhouse.entity";
import AuthMiddleware from "presentation/middleware/auth.middleware";
import UserService from "application/services/user.service";

const app: Express = express();

export const init = async () => {
  const orm = await MikroORM.init(options);

  app.use(express.json());

  app.use((req, res, next) => RequestContext.create(orm.em, next));

  const authMiddleware = new AuthMiddleware(
    new UserService(orm.em.getRepository(User), User),
  );

  authMiddleware.initialize();

  app.use(
    "/user",
    makeUserController(orm.em.getRepository(User), User, authMiddleware).router,
  );
  app.use(
    "/property",
    makePropertyController(orm.em.getRepository(Property), Property).router,
  );
  app.use(
    "/admin",
    makeAdminController(orm.em.getRepository(Admin), Admin).router,
  );
  app.use(
    "/openhouse",
    makeOpenhouseController(
      orm.em.getRepository(Openhouse),
      Openhouse,
      orm.em.getRepository(Property),
      Property,
      orm.em.getRepository(User),
      User,
    ).router,
  );

  app.use((req: Request, res: Response) => {
    const response = new HttpResponse({ message: "No route found" }, 404);
    res.status(response.status).send(response);
  });

  app.use(
    (
      err: { message: any; status: number; stack?: string },
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const response = new HttpResponse(
        { message: err.message },
        err.status || 500,
      );

      if (config.isDev || config.isTest)
        response.data = { ...response.data, stack: err.stack };

      res.status(response.status).send(response);
    },
  );

  app.listen(3000, () => {
    console.log(`Listening on port 3000`);
  });
};
