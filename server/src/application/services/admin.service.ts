import { EntityRepository } from "@mikro-orm/core";
import { NotFoundError } from "domain/errors";
import { Admin } from "entities/admin.entity";
import {
  IAdminData,
  IAdminEntity,
  IAdminService,
} from "interfaces/admin.interface";
import { Constructable } from "typedi";

class AdminService implements IAdminService {
  repository: EntityRepository<Admin>;
  entity: Constructable<Admin>;

  constructor(
    repository: EntityRepository<Admin>,
    entity: Constructable<Admin>,
  ) {
    this.repository = repository;
    this.entity = entity;
  }

  public createAdmin = async (adminData: IAdminData): Promise<IAdminEntity> => {
    const admin = this.repository.create(
      new this.entity(adminData.name, adminData.email, adminData.password),
    );
    await this.repository.persistAndFlush(admin);
    return admin;
  };

  public getOneById = async (userId: string): Promise<IAdminEntity> => {
    const admin = await this.repository.findOne(userId);
    if (!admin) throw new NotFoundError("Admin not found");
    return admin;
  };

  public getOneByEmail = async (
    email: string,
  ): Promise<IAdminEntity | null> => {
    const admin = await this.repository.findOne({ email });
    return admin;
  };
}

export default AdminService;
