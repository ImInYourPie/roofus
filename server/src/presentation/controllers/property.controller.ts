import { HttpResponse } from "domain/response";
import { NextFunction, Request, Response, Router } from "express";
import { IPropertyUseCase } from "interfaces/property.interface";

class PropertyController {
  public router = Router();
  useCase: IPropertyUseCase;

  constructor(useCase: IPropertyUseCase, authenticate: any) {
    this.useCase = useCase;
    this.router.route("/").get(this.many);
  }

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
}
export default PropertyController;
