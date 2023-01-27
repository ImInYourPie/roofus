import { Entity, Property as Prop } from "@mikro-orm/core";
import CustomBaseEntity from "./base.entity";

@Entity()
class Property extends CustomBaseEntity {
  @Prop()
  adress: string;

  constructor(adress: string) {
    super();
    this.adress = adress;
  }
}

export { Property };
