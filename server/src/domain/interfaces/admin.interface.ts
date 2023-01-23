import { IHttpResponseConstructable, IUserEntity } from "./";

interface IAdminEntity extends IUserEntity {
  email: string;
}

interface IAdminUseCase {
  createAdmin(user: IUserEntity): IHttpResponseConstructable;
}

export { IAdminEntity, IAdminUseCase };
