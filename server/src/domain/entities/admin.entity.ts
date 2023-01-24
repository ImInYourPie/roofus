import { Property } from "@mikro-orm/core";
import { IAdminEntity } from "interfaces/admin.interface";
import { UserEntity } from "./user.entity";

class AdminEntity extends UserEntity implements IAdminEntity {
  @Property()
  email: string;

  @Property()
  password: string;

  constructor(name: string, email: string, password: string) {
    super(name);
    this.email = email;
    this.password = password;
  }
}

export default AdminEntity;
