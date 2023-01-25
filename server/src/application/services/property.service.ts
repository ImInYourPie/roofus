import { EntityRepository } from "@mikro-orm/core";
import { Property } from "entities/property.entity";
import { IPropertyList } from "interfaces/property.interface";
import { Constructable } from "typedi";

class PropertyService {
  repository: EntityRepository<Property>;
  entity: Constructable<Property>;

  constructor(
    repository: EntityRepository<Property>,
    entity: Constructable<Property>,
  ) {
    this.repository = repository;
    this.entity = entity;
  }

  public getMany = async (): Promise<IPropertyList> => {
    const [properties, count] = await this.repository.findAndCount({});
    return { properties, count: count || 0 };
  };
}

export default PropertyService;
