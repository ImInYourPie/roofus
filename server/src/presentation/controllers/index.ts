// Users
import UserService from "application/services/user.service";
import UserUseCase from "application/usecases/user.usecase";
import UserController from "./user.controller";

const makeUserController = (repository: any, entity: any) =>
  new UserController(new UserUseCase(new UserService(repository, entity)), {});

export { makeUserController };
