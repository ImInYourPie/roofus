import PropertyService from "application/services/property.service";
import { BadRequestError, NotFoundError } from "domain/errors";
import {
  IOpenhouseData,
  IOpenhouseEntity,
  IOpenhouseList,
  IOpenhouseService,
  IOpenhouseWithProperty,
} from "interfaces/openhouse.interface";
import { IPropertyService } from "interfaces/property.interface";
import { IUserService } from "interfaces/user.interface";

class OpenhouseUseCase {
  service: IOpenhouseService;
  propertyService: IPropertyService;
  userService: IUserService;

  constructor(
    service: IOpenhouseService,
    propertyService: IPropertyService,
    userService: IUserService,
  ) {
    this.service = service;
    this.propertyService = propertyService;
    this.userService = userService;
  }

  public async createOneOpenhouse(
    openhouseData: IOpenhouseData,
  ): Promise<IOpenhouseEntity> {
    const openhouseWithProperty = await this.buildOpenhouse(openhouseData);

    return await this.service.createOpenhouse(openhouseWithProperty);
  }

  public async list(): Promise<IOpenhouseList> {
    return await this.service.getMany();
  }

  private buildOpenhouse = async (
    openhouseData: IOpenhouseData,
  ): Promise<IOpenhouseWithProperty> => {
    const inLimit = this.checkVisitorAmountInLimits(
      openhouseData.visitorAmount,
      openhouseData.visitors.length,
    );

    if (!inLimit) throw new BadRequestError("More visitors than house allows");

    const allValidVisitors = this.validateVisitors(openhouseData.visitors);

    if (!allValidVisitors)
      throw new BadRequestError(
        "Visitors is invalid, all visitors must existing users",
      );

    const property = await this.propertyService.getOneById(
      openhouseData.property,
    );

    if (!property) throw new NotFoundError("Property not found");

    return {
      visitorAmount: openhouseData.visitorAmount,
      property,
      visitors: openhouseData.visitors,
    };
  };

  private checkVisitorAmountInLimits = (
    limit: number,
    numOfVisitors: number,
  ) => {
    return numOfVisitors <= limit;
  };

  private validateVisitors = async (visitors: string[]): Promise<boolean> => {
    const allVisitorsExist = visitors.every((visitor: string) => {
      try {
        return !!this.userService.getOneById(visitor);
      } catch (err) {
        if (err instanceof NotFoundError) return false;
        throw err;
      }
    });

    return allVisitorsExist;
  };
}

export default OpenhouseUseCase;
