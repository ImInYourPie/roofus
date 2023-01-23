import { Request, Response } from "express";
import { IHttpResponseConstructable } from "./";

interface IUserService {
  createOne(user: IUserEntity): IUserEntity;
}

interface IUserController {
  create(req: Request, res: Response): IUserEntity;
}

interface IUserEntity {
  id: number;
  name: string;
}

interface IUserUseCase {
  createUser(user: IUserEntity): Promise<IHttpResponseConstructable>;
}

export { IUserService, IUserController, IUserEntity, IUserUseCase };
