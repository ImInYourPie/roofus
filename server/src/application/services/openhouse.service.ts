import { EntityRepository } from "@mikro-orm/core";
import { NotFoundError } from "domain/errors";
import { Openhouse } from "entities/openhouse.entity";
import {
  IOpenhouseEntity,
  IOpenhouseList,
  IOpenhouseService,
  IOpenhouseWithProperty,
} from "interfaces/openhouse.interface";
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

  public editOpenhouse = async (
    id: string,
    openhouseData: IOpenhouseWithProperty,
  ): Promise<IOpenhouseEntity> => {
    const openhouse = await this.repository.findOne(id);

    if (!openhouse) throw new NotFoundError("Property not found");

    Object.assign(openhouse, openhouseData);

    await this.repository.persistAndFlush(openhouse);
    return openhouse;
  };

  public getMany = async (): Promise<IOpenhouseList> => {
    const [openhouses, count] = await this.repository.findAndCount(
      {},
      { populate: ["property"] },
    );
    return { openhouses, count };
  };

  public getOneById = async (id: string): Promise<IOpenhouseEntity> => {
    const openhouse = await this.repository.findOne(id, {
      populate: ["property"],
    });
    if (!openhouse) throw new NotFoundError("Openhouse not found");
    return openhouse;
  };
}

export default OpenhouseService;
