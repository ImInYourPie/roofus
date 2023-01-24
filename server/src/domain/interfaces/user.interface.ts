import { EntityRepository, Loaded } from "@mikro-orm/core";
import { Request, Response } from "express";

interface IUserRepository {
  save(user: IUserEntity): Promise<IUserEntity>;
  edit(userId: string, body: IUserEntity): Promise<IUserEntity>;
  delete(userId: string): Promise<IUserEntity>;
  findOneById(userId: string): Promise<IUserEntity>;
  findMany(): IUserList;
}

interface IUserService {
  createUser(user: IUserData): Promise<IUserEntity>;
  getOneById(id: string): Promise<IUserEntity>;
  getMany(): Promise<IUserList>;
}

interface IUserList {
  users: IUserEntity[];
  count: number;
}

interface IUserController {
  create(req: Request, res: Response): IUserEntity;
}

interface IUserEntity {
  id: string;
  name: string;
}

interface IUserData {
  name: string;
}

interface IUserEntityConstructable {
  new (name: string): IUserEntity;
}

interface IUserUseCase {
  createOneUser(user: IUserData): Promise<IUserEntity>;
  list(): Promise<IUserList>;
  getUserById(id: string): Promise<IUserEntity>;
}

export {
  IUserRepository,
  IUserService,
  IUserController,
  IUserEntity,
  IUserUseCase,
  IUserEntityConstructable,
  IUserData,
  IUserList,
};
