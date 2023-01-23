import { Router } from "express";
import { IUserService } from "domain/interfaces";

class UserController {
  private userService: IUserService;
  public router = Router();
  constructor(
    userService: IUserService,
    authenticate: IAuthenticateMiddleware,
  ) {
    this.userService = userService;
    this.router.post("/", authenticate, this.create);
    this.router.get("/", authenticate, this.index);
  }
  public async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.json(user);
  }
  public async index(req: Request, res: Response) {
    const users = await this.userService.getAll();
    res.json(users);
  }
}
export default UserController;
