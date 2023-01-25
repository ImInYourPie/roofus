import { HttpResponse } from "domain/response";
import { NextFunction, Request, Response, Router } from "express";
import { IOpenhouseUseCase } from "interfaces/openhouse.interface";

class OpenhouseController {
  public router = Router();
  useCase: IOpenhouseUseCase;

  constructor(useCase: IOpenhouseUseCase, authenticate: any) {
    this.useCase = useCase;
    this.router.route("/").get(this.many).post(this.create);
    this.router.route("/:openhouseId").get(this.one).patch(this.edit);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { visitorAmount, property, visitors } = req.body;
      const openhouse = await this.useCase.createOneOpenhouse({
        visitorAmount,
        property,
        visitors,
      });
      const response = new HttpResponse({ openhouse });
      res.send(response);
    } catch (err) {
      next(err);
    }
  };

  private edit = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { openhouseId } = req.params;
      const { visitorAmount, property, visitors } = req.body;

      await this.useCase.editOneOpenhouse(openhouseId, {
        visitorAmount,
        property,
        visitors,
      });

      const updatedOpenhouse = await this.useCase.getOne(openhouseId);

      const response = new HttpResponse({ updatedOpenhouse });
      res.send(response);
    } catch (err) {
      next(err);
    }
  };

  private many = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.useCase.list();
      const response = new HttpResponse(data);
      res.send(response);
    } catch (err) {
      next(err);
    }
  };

  private one = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { openhouseId } = req.params;
      const openhouse = await this.useCase.getOne(openhouseId);
      const response = new HttpResponse(openhouse);
      res.send(response);
    } catch (err) {
      next(err);
    }
  };
}
export default OpenhouseController;
