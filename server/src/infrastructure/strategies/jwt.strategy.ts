import { Request, Response } from "express";
import { PassportStatic } from "passport";
import { IAuthStrategy, IUserEntity } from "interfaces";
import { IHttpError } from "interfaces";

const makeJwtStrategy = () =>
  class JWTStrategy implements IAuthStrategy {
    passport: PassportStatic;
    HttpError: IHttpError;

    constructor(passport: PassportStatic, HttpError: IHttpError) {
      this.passport = passport;
      this.HttpError = HttpError;
    }

    public authenticate(req: Request, res: Response): Promise<IUserEntity> {
      return new Promise((resolve, reject) => {
        this.passport.authenticate(
          "jwt",
          { session: false },
          (err: Error, user: IUserEntity, info: any) => {
            if (err) {
              return reject(err);
            }
            if (!user) {
              return reject(
                this.HttpError(401, { message: "Unauthenticated" }),
              );
            }
            resolve(user);
          },
        )(req, res);
      });
    }
  };

export default JWTStrategy;
