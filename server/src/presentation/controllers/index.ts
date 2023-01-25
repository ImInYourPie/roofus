import AdminService from "application/services/admin.service";
import PropertyService from "application/services/property.service";
import UserService from "application/services/user.service";
import AdminUseCase from "application/usecases/admin.usecase";
import PropertyUseCase from "application/usecases/property.usecase";
import UserUseCase from "application/usecases/user.usecase";
import AdminController from "./admin.controller";
import PropertyController from "./property.controller";
import UserController from "./user.controller";

const makeUserController = (repository: any, entity: any) =>
  new UserController(new UserUseCase(new UserService(repository, entity)), {});

const makePropertyController = (repository: any, entity: any) =>
  new PropertyController(
    new PropertyUseCase(new PropertyService(repository, entity)),
    {},
  );

const makeAdminController = (repository: any, entity: any) =>
  new AdminController(
    new AdminUseCase(new AdminService(repository, entity)),
    {},
  );

export { makeUserController, makePropertyController, makeAdminController };
