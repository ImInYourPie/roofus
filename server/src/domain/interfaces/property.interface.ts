interface IPropertyUseCase {
  list(): Promise<IPropertyList>;
  getOne(id: string): Promise<IPropertyWithMeta>;
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
  createdAt: any;
  id: string;
  adress: string;
}

interface IPropertyData {
  adress: string;
}

interface IPropertyWithMeta {
  property: IPropertyEntity;
  meta: {
    previous: IPropertyEntity | null;
    next: IPropertyEntity | null;
  };
}

interface IPropertyService {
  createProperty(propertyData: IPropertyData): Promise<IPropertyEntity>;
  editProperty(
    id: string,
    propertyData: IPropertyData,
  ): Promise<IPropertyEntity>;
  getMany(): Promise<IPropertyList>;
  getOneById(id: string): Promise<IPropertyEntity>;
  getPrev(id: string): Promise<IPropertyEntity>;
  getNext(id: string): Promise<IPropertyEntity>;
}

export {
  IPropertyUseCase,
  IPropertyEntity,
  IPropertyList,
  IPropertyService,
  IPropertyData,
  IPropertyWithMeta,
};
