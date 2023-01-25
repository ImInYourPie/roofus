import { EntityRepository } from "@mikro-orm/core";
import { NotFoundError } from "domain/errors";
import { User } from "entities/user.entity";
import { IUserData, IUserEntity, IUserList } from "interfaces/user.interface";
import { Constructable } from "typedi";

class UserService {
  userRepository: EntityRepository<User>;
  UserEntity: Constructable<User>;

  constructor(
    userRepository: EntityRepository<User>,
    UserEntity: Constructable<User>,
  ) {
    this.userRepository = userRepository;
    this.UserEntity = UserEntity;
  }

  public createUser = async (userData: IUserData): Promise<IUserEntity> => {
    const user = this.userRepository.create(new this.UserEntity(userData.name));
    await this.userRepository.persistAndFlush(user);
    return user;
  };

  public getOneById = async (userId: string): Promise<IUserEntity> => {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundError("User not found");
    return user;
  };

  public getMany = async (): Promise<IUserList> => {
    const [users, count] = await this.userRepository.findAndCount({});
    return { users, count: count || 0 };
  };
}

export default UserService;
