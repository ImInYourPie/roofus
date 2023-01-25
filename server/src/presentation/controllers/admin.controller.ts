import { HttpResponse } from "domain/response";
import { NextFunction, Request, Response, Router } from "express";
import { IAdminUseCase } from "interfaces/admin.interface";
import { IPropertyUseCase } from "interfaces/property.interface";

class AdminController {
  public router = Router();
  useCase: IAdminUseCase;

  constructor(useCase: IAdminUseCase, authenticate: any) {
    this.useCase = useCase;
    this.router.route("/").post(this.create);
    this.router.route("/auth").post(this.auth);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const admin = await this.useCase.createOneAdmin(name, email, password);
      const response = new HttpResponse({ admin });
      res.send(response);
    } catch (err) {
      next(err);
    }
  };

  private auth = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.useCase.auth(email, password);
      const response = new HttpResponse({ token });
      res.send(response);
    } catch (err) {
      next(err);
    }
  };
}
export default AdminController;