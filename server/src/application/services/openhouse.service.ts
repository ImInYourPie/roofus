import { EntityRepository } from "@mikro-orm/core";
import { Openhouse } from "entities/openhouse.entity";
import {
  IOpenhouseEntity,
  IOpenhouseList,
  IOpenhouseService,
  IOpenhouseWithProperty,
} from "interfaces/openhouse.interface";
import { IPropertyEntity } from "interfaces/property.interface";
import { Constructable } from "typedi";

class OpenhouseService implements IOpenhouseService {
  repository: EntityRepository<Openhouse>;
  entity: Constructable<Openhouse>;

  constructor(
    repository: EntityRepository<Openhouse>,
    entity: Constructable<Openhouse>,
  ) {
    this.repository = repository;
    this.entity = entity;
  }

  public createOpenhouse = async (
    openhouseData: IOpenhouseWithProperty,
  ): Promise<IOpenhouseEntity> => {
    const openhouse = this.repository.create(
      new this.entity(
        openhouseData.visitorAmount,
        openhouseData.property,
        openhouseData.visitors,
      ),
    );

    await this.repository.persistAndFlush(openhouse);
    return openhouse;
  };

  public getMany = async (): Promise<IOpenhouseList> => {
    const [openhouses, count] = await this.repository.findAndCount({});
    return { openhouses, count };
  };
}

export default OpenhouseService;
