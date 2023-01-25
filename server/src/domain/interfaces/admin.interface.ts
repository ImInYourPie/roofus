interface IAdminEntity {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface IAdminData {
  name: string;
  email: string;
  password: string;
}

interface IAdminUseCase {
  getAdminById(id: string): Promise<IAdminEntity>;
  createOneAdmin(
    name: string,
    email: string,
    password: string,
  ): Promise<IAdminEntity>;
  auth(email: string, password: string): Promise<string>;
}

interface IAdminService {
  getOneById(id: string): Promise<IAdminEntity>;
  createAdmin(admin: IAdminData): Promise<IAdminEntity>;
  getOneByEmail(email: string): Promise<IAdminEntity | null>;
}

export { IAdminEntity, IAdminUseCase, IAdminService, IAdminData };
