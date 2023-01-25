import { BadRequestError } from "domain/errors";
import { IAdminEntity, IAdminService } from "interfaces/admin.interface";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

class AdminUseCase {
  service: IAdminService;
  constructor(service: IAdminService) {
    this.service = service;
  }

  public async createOneAdmin(
    name: string,
    email: string,
    password: string,
  ): Promise<IAdminEntity> {
    this.validateName(name);
    this.validateEmail(email);
    this.validatePassword(password);

    password = await this.hashPassword(password);

    const newAdmin = await this.service.createAdmin({ name, email, password });
    return newAdmin;
  }

  public async getAdminById(id: string): Promise<IAdminEntity> {
    return await this.service.getOneById(id);
  }

  public async auth(email: string, password: string): Promise<string> {
    const admin = await this.service.getOneByEmail(email);
    if (!admin) throw new BadRequestError("Email or password incorrect");

    const matchesHash = await this.matchHash(password, admin.password);
    if (!matchesHash) throw new BadRequestError("Email or password incorrect");

    const token = this.signJwt(admin.id, admin.email);
    return token;
  }

  private matchHash = async (
    password: string,
    hash: string,
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
  };

  private signJwt = (id: string, email: string): string => {
    return jwt.sign({ id, email }, config.jwtSecret);
  };

  private hashPassword = async (password: string): Promise<string> => {
    return await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
  };

  private validateName(name: string): void {
    if (!name) throw new BadRequestError("An admin must have a name");
    return;
  }

  private validateEmail(email: string): void {
    if (!email) throw new BadRequestError("An admin must have an email");
    return;
  }

  private validatePassword(password: string): void {
    if (!password || password.length < 6)
      throw new BadRequestError(
        "An admin mkust have a password with, at least, 6 characters",
      );
    return;
  }
}

export default AdminUseCase;
