import { IUserEntity } from "./user.interface";

interface IAdminEntity extends IUserEntity {
  id: string;
  email: string;
  password: string;
}

interface IAdminUseCase {
  createAdmin(user: IUserEntity): Promise<IAdminEntity>;
}

export { IAdminEntity, IAdminUseCase };
