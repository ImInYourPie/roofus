import { HttpResponse } from "domain/response";
import { NextFunction, Request, Response, Router } from "express";
import { IPropertyUseCase } from "interfaces/property.interface";

class PropertyController {
  public router = Router();
  useCase: IPropertyUseCase;

  constructor(useCase: IPropertyUseCase, authMiddleware: any) {
    this.useCase = useCase;
    this.router.use(authMiddleware.authenticate());
    this.router.route("/").get(this.many).post(this.create);
    this.router.route("/:propertyId").get(this.many).patch(this.edit);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { adress } = req.body;
      const property = await this.useCase.createOneProperty({ adress });
      const response = new HttpResponse({ property });
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
      const { adress } = req.body;
      const { propertyId } = req.params;
      const property = await this.useCase.editOneProperty(propertyId, {
        adress,
      });
      const response = new HttpResponse({ property });
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
}
export default PropertyController;
