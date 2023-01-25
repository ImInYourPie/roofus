import { IPropertyList, IPropertyService } from "interfaces/property.interface";

class PropertyUseCase {
  service: IPropertyService;
  constructor(service: IPropertyService) {
    this.service = service;
  }

  public async list(): Promise<IPropertyList> {
    return await this.service.getMany();
  }
}

export default PropertyUseCase;
