import { BadRequestError } from "domain/errors";
import {
  IUserData,
  IUserEntity,
  IUserList,
  IUserService,
} from "interfaces/user.interface";

class UserUseCase {
  userService: IUserService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async createOneUser(user: IUserData): Promise<IUserEntity> {
    this.validateName(user.name);
    const newUser = await this.userService.createUser(user);
    return newUser;
  }

  public async list(): Promise<IUserList> {
    return await this.userService.getMany();
  }

  public async getUserById(id: string): Promise<IUserEntity> {
    return await this.userService.getOneById(id);
  }

  private validateName(name: string): void {
    if (!name) throw new BadRequestError("A user must have a name");
    return;
  }
}

export default UserUseCase;
