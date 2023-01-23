import { IUserEntity, IAdminEntity } from "interfaces";

class Admin implements IAdminEntity {
  #user: IUserEntity;
  #email: string;

  constructor(user: IUserEntity, email: string) {
    this.#user = user;
    this.#email = email;
  }

  public get id() {
    return this.#user.id;
  }

  public get name() {
    return this.#user.name;
  }

  public get email() {
    return this.#email;
  }

  public set email(email: string) {
    this.#email = email;
  }
}

export default Admin;
