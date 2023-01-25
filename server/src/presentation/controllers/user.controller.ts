import { HttpResponse } from "domain/response";
import { NextFunction, Request, Response, Router } from "express";
import { IUserUseCase } from "interfaces/user.interface";

class UserController {
  public router = Router();
  userUseCase: IUserUseCase;

  constructor(userUseCase: IUserUseCase, authenticate: any) {
    this.userUseCase = userUseCase;
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
      const users = await this.userUseCase.list();
      const response = new HttpResponse({ users });
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
export default UserController;
