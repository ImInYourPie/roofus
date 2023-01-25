import AdminService from "application/services/admin.service";
import OpenhouseService from "application/services/openhouse.service";
import PropertyService from "application/services/property.service";
import UserService from "application/services/user.service";
import AdminUseCase from "application/usecases/admin.usecase";
import OpenhouseUseCase from "application/usecases/openhouse.usecase";
import PropertyUseCase from "application/usecases/property.usecase";
import UserUseCase from "application/usecases/user.usecase";
import AdminController from "./admin.controller";
import OpenhouseController from "./openhouse.controller";
import PropertyController from "./property.controller";
import UserController from "./user.controller";




const makeUserController = (repository: any, entity: any, authMiddleware: any) =>
  new UserController(new UserUseCase(new UserService(repository, entity)), authMiddleware);

const makePropertyController = (repository: any, entity: any) =>
  new PropertyController(
    new PropertyUseCase(new PropertyService(repository, entity)),
    {},
  );

const makeAdminController = (repository: any, entity: any) =>
  new AdminController(
    new AdminUseCase(new AdminService(repository, entity)),
    ,
  );

const makeOpenhouseController = (
  repository: any,
  entity: any,
  propertyRepository: any,
  propertyEntity: any,
  userRepository: any,
  userEntity: any,
) =>
  new OpenhouseController(
    new OpenhouseUseCase(
      new OpenhouseService(repository, entity),
      new PropertyService(propertyRepository, propertyEntity),
      new UserService(userRepository, userEntity),
    ),
    {},
  );

export {
  makeUserController,
  makePropertyController,
  makeAdminController,
  makeOpenhouseController,
};
