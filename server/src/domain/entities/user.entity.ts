import { Entity } from "@mikro-orm/core";
import { IUserEntity } from "interfaces";

class User implements IUserEntity {
  #id: number;
  #name: string;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
  }

  public get id(): number {
    return this.#id;
  }

  public set id(id: number) {
    this.#id = id;
  }

  public get name(): string {
    return this.#name;
  }

  public set name(name: string) {
    this.#name = name;
  }
}

export default User;
