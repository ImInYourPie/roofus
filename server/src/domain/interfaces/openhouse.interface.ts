import { IPropertyEntity } from "./property.interface";

interface IOpenhouseData {
  property: string;
  visitorAmount: number;
  visitors: string[];
}

interface IOpenhouseEntity {
  id: string;
  property: IPropertyEntity;
  visitorAmount: number;
  visitors: string[];
}

interface IOpenhouseList {
  openhouses: IOpenhouseEntity[];
  count: number;
}

interface IOpenhouseService {
  createOpenhouse(
    openhouseData: IOpenhouseWithProperty,
  ): Promise<IOpenhouseEntity>;
  getMany(): Promise<IOpenhouseList>;
}

interface IOpenhouseUseCase {
  list(): Promise<IOpenhouseList>;
  createOneOpenhouse(openhouseData: IOpenhouseData): Promise<IOpenhouseEntity>;
}

interface IOpenhouseWithProperty {
  visitorAmount: number;
  property: IPropertyEntity;
  visitors: string[];
}

export {
  IOpenhouseData,
  IOpenhouseEntity,
  IOpenhouseList,
  IOpenhouseService,
  IOpenhouseUseCase,
  IOpenhouseWithProperty,
};
