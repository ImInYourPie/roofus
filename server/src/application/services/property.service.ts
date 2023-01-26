import { EntityRepository } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { NotFoundError } from "domain/errors";
import { Property } from "entities/property.entity";
import {
  IPropertyData,
  IPropertyEntity,
  IPropertyList,
} from "interfaces/property.interface";
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

  public createProperty = async (
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity> => {
    const property = this.repository.create(
      new this.entity(propertyData.adress),
    );

    await this.repository.persistAndFlush(property);
    return property;
  };

  public editProperty = async (
    id: string,
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity> => {
    const property = await this.repository.findOne(id);

    if (!property) throw new NotFoundError("Property not found");

    property.adress = propertyData.adress;

    await this.repository.persistAndFlush(property);
    return property;
  };

  public getMany = async (): Promise<IPropertyList> => {
    const [properties, count] = await this.repository.findAndCount({});
    return { properties, count: count || 0 };
  };

  public getOneById = async (propertyId: string): Promise<IPropertyEntity> => {
    const property = await this.repository.findOne(propertyId);
    if (!property) throw new NotFoundError("Property not found");
    return property;
  };

  public getPrev = async (date: string): Promise<IPropertyEntity | null> => {
    const prevEntries = await this.repository.find({
      createdAt: { $lt: date },
    });

    return prevEntries[prevEntries.length - 1] || null;
  };

  public getNext = async (date: string): Promise<IPropertyEntity | null> => {
    const nextEntries = await this.repository.find({
      createdAt: { $gt: date },
    });
    return nextEntries[nextEntries.length - 1] || null;
  };
}

export default PropertyService;
