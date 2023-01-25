import { Entity, Property } from "@mikro-orm/core";
import { IUserEntity } from "interfaces/user.interface";
import CustomBaseEntity from "./base.entity";

@Entity()
class User extends CustomBaseEntity implements IUserEntity {
  @Property()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export { User };
