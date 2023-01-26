import { BadRequestError } from "domain/errors";
import {
  IPropertyData,
  IPropertyEntity,
  IPropertyList,
  IPropertyService,
  IPropertyWithMeta,
} from "interfaces/property.interface";

class PropertyUseCase {
  service: IPropertyService;
  constructor(service: IPropertyService) {
    this.service = service;
  }

  public async createOneProperty(
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity> {
    this.validateAddress(propertyData.adress);
    return await this.service.createProperty(propertyData);
  }

  public async editOneProperty(
    id: string,
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity> {
    this.validateAddress(propertyData.adress);
    return await this.service.editProperty(id, propertyData);
  }

  public async list(): Promise<IPropertyList> {
    return await this.service.getMany();
  }

  public async getOne(id: string): Promise<IPropertyWithMeta> {
    const property = await this.service.getOneById(id);
    const previous = await this.service.getPrev(property.createdAt);
    const next = await this.service.getNext(property.createdAt);

    return { property, meta: { previous, next } };
  }

  private validateAddress(name: string): void {
    if (!name) throw new BadRequestError("A property must have an address");
    return;
  }
}

export default PropertyUseCase;
