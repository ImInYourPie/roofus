import { BadRequestError, NotFoundError } from "domain/errors";
import {
  IOpenhouseData,
  IOpenhouseEntity,
  IOpenhouseList,
  IOpenhouseService,
  IOpenhouseUseCase,
  IOpenhouseWithProperty,
} from "interfaces/openhouse.interface";
import { IPropertyService } from "interfaces/property.interface";
import { IUserService } from "interfaces/user.interface";

class OpenhouseUseCase implements IOpenhouseUseCase {
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

  public async editOneOpenhouse(
    id: string,
    openhouseData: IOpenhouseData,
  ): Promise<IOpenhouseEntity> {
    const openhouseWithProperty = await this.buildOpenhouse(openhouseData);

    return await this.service.editOpenhouse(id, openhouseWithProperty);
  }

  public async getOne(id: string): Promise<IOpenhouseEntity> {
    const openhouse = await this.service.getOneById(id);
    return openhouse;
  }

  public async list(): Promise<IOpenhouseList> {
    return await this.service.getMany();
  }

  private buildOpenhouse = async (
    openhouseData: IOpenhouseData,
  ): Promise<IOpenhouseWithProperty> => {
    const validDate = this.validateStartDate(openhouseData.startDate);
    if (!validDate) throw new BadRequestError("Invalid start date provided");

    const inLimit = this.checkVisitorAmountInLimits(
      openhouseData.visitorAmount,
      openhouseData.visitors.length,
    );
    if (!inLimit) throw new BadRequestError("More visitors than house allows");

    const allValidVisitors = await this.validateVisitors(
      openhouseData.visitors,
    );
    if (!allValidVisitors)
      throw new BadRequestError(
        "Visitors is invalid, all visitors must existing users",
      );

    if (!openhouseData.property)
      throw new BadRequestError("Property is required");

    const property = await this.propertyService.getOneById(
      openhouseData.property,
    );
    if (!property) throw new NotFoundError("Property not found");

    return {
      visitorAmount: openhouseData.visitorAmount,
      property,
      visitors: openhouseData.visitors,
      startDate: new Date(openhouseData.startDate),
    };
  };

  private checkVisitorAmountInLimits = (
    limit: number,
    numOfVisitors: number,
  ) => {
    return numOfVisitors <= limit;
  };

  private validateStartDate = (date: string) => {
    return !isNaN(new Date(date).getDate());
  };

  private validateVisitors = async (visitors: string[]): Promise<boolean> => {
    try {
      if (visitors.length === 0) return true;
      for (let i = 0; i < visitors.length; ++i) {
        await this.userService.getOneById(visitors[i]);
      }
      return true;
    } catch (err) {
      if (err instanceof NotFoundError) return false;
      throw err;
    }
  };
}

export default OpenhouseUseCase;
