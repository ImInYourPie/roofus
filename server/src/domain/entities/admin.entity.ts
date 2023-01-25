import { Property, Unique, Entity } from "@mikro-orm/core";
import { IAdminEntity } from "interfaces/admin.interface";
import { User } from "./user.entity";

@Entity()
class Admin extends User implements IAdminEntity {
  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  constructor(name: string, email: string, password: string) {
    super(name);
    this.email = email;
    this.password = password;
  }
}

export { Admin };
