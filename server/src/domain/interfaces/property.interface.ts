interface IPropertyUseCase {
  list(): Promise<IPropertyList>;
  createOneProperty(propertyData: IPropertyData): Promise<IPropertyEntity>;
  editOneProperty(
    id: string,
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity>;
}

interface IPropertyList {
  properties: IPropertyEntity[];
  count: number;
}

interface IPropertyEntity {
  id: string;
  adress: string;
}

interface IPropertyData {
  adress: string;
}

interface IPropertyService {
  createProperty(propertyData: IPropertyData): Promise<IPropertyEntity>;
  editProperty(
    id: string,
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity>;
  getMany(): Promise<IPropertyList>;
  getOneById(id: string): Promise<IPropertyEntity>;
}

export {
  IPropertyUseCase,
  IPropertyEntity,
  IPropertyList,
  IPropertyService,
  IPropertyData,
};
