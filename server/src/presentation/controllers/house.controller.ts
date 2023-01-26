import { HttpResponse } from "domain/response";
import { NextFunction, Request, Response, Router } from "express";
import { IUserUseCase } from "interfaces/user.interface";

class HouseController {
  public router = Router();
  userUseCase: IUserUseCase;

  constructor(userUseCase: IUserUseCase, authMiddleware: any) {
    this.userUseCase = userUseCase;
    this.router.use(authMiddleware.authenticate());
    this.router.route("/").get(this.many).post(this.create);
    this.router.route("/:userId").get(this.one);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name } = req.body;
      const user = await this.userUseCase.createOneUser({ name });
      const response = new HttpResponse({ user });
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
      const data = await this.userUseCase.list();
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
      const { userId } = req.params;
      const user = await this.userUseCase.getUserById(userId);
      const response = new HttpResponse({ user });
      res.send(response);
    } catch (err) {
      next(err);
    }
  };
}
export default HouseController;
