import { Entity, Property as Prop, OneToOne } from "@mikro-orm/core";
import CustomBaseEntity from "./base.entity";
import { Property } from "./property.entity";

@Entity()
class Openhouse extends CustomBaseEntity {
  @Prop()
  visitorAmount: number;

  @OneToOne({ entity: () => Property })
  property: Property;

  @Prop()
  visitors: string[];

  @Prop()
  startDate: Date;

  constructor(
    visitorAmount: number,
    property: Property,
    visitors: string[],
    startDate: Date,
  ) {
    super();
    this.visitorAmount = visitorAmount;
    this.property = property;
    this.visitors = visitors;
    this.startDate = startDate;
  }
}

export { Openhouse };
