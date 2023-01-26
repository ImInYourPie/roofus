import { IPropertyEntity } from "./property.interface";

interface IOpenhouseData {
  property: string;
  visitorAmount: number;
  visitors: string[];
  startDate: string;
}

interface IOpenhouseEntity {
  id: string;
  property: IPropertyEntity;
  visitorAmount: number;
  visitors: string[];
  startDate: Date;
}

interface IOpenhouseList {
  openhouses: IOpenhouseEntity[];
  count: number;
}

interface IOpenhouseService {
  createOpenhouse(
    openhouseData: IOpenhouseWithProperty,
  ): Promise<IOpenhouseEntity>;
  editOpenhouse(
    id: string,
    openhouseData: IOpenhouseWithProperty,
  ): Promise<IOpenhouseEntity>;
  getMany(): Promise<IOpenhouseList>;
  getOneById(id: string): Promise<IOpenhouseEntity>;
}

interface IOpenhouseUseCase {
  list(): Promise<IOpenhouseList>;
  getOne(id: string): Promise<IOpenhouseEntity>;
  createOneOpenhouse(openhouseData: IOpenhouseData): Promise<IOpenhouseEntity>;
  editOneOpenhouse(
    id: string,
    openhouseData: IOpenhouseData,
  ): Promise<IOpenhouseEntity>;
}

interface IOpenhouseWithProperty {
  visitorAmount: number;
  property: IPropertyEntity;
  visitors: string[];
  startDate: Date;
}

export {
  IOpenhouseData,
  IOpenhouseEntity,
  IOpenhouseList,
  IOpenhouseService,
  IOpenhouseUseCase,
  IOpenhouseWithProperty,
};
