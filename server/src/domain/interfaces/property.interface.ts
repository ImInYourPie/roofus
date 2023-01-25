interface IPropertyUseCase {
  list(): Promise<IPropertyList>;
}

interface IPropertyList {
  properties: IPropertyEntity[];
  count: number;
}

interface IPropertyEntity {
  id: string;
  adress: string;
}

interface IPropertyService {
  getMany(): Promise<IPropertyList>;
}

export { IPropertyUseCase, IPropertyEntity, IPropertyList, IPropertyService };
