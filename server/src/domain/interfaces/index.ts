import IEnv from "./env.interface";
import IDBConfig from "./db-config.interface";
import { IUserService, IUserController, IUserEntity } from "./user.interface";
import {
  IHttpRequest,
  IHttpResponseConstructable,
  IHttpSuccess,
  IHttpError,
} from "./http.interface";
import { IAdminEntity, IAdminUseCase } from "./admin.interface";
import { IAuthStrategy, IAuthMiddleware } from "./authenticate.interface";

export {
  IEnv,
  IDBConfig,
  IUserService,
  IUserController,
  IUserEntity,
  IHttpRequest,
  IHttpResponseConstructable,
  IHttpSuccess,
  IHttpError,
  IAdminEntity,
  IAdminUseCase,
  IAuthStrategy,
  IAuthMiddleware,
};
