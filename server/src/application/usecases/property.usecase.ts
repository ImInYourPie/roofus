import {
  IPropertyData,
  IPropertyEntity,
  IPropertyList,
  IPropertyService,
} from "interfaces/property.interface";

class PropertyUseCase {
  service: IPropertyService;
  constructor(service: IPropertyService) {
    this.service = service;
  }

  public async createOneProperty(
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity> {
    return await this.service.createProperty(propertyData);
  }

  public async editOneProperty(
    id: string,
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity> {
    return await this.service.editProperty(id, propertyData);
  }

  public async list(): Promise<IPropertyList> {
    return await this.service.getMany();
  }
}

export default PropertyUseCase;
