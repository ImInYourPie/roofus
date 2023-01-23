import { IAuthStrategy, IAuthMiddleware } from "interfaces";

const makeAuth = (strategy: IAuthStrategy) =>
  class AuthMiddleware implements IAuthMiddleware {
    #strategy: IAuthStrategy = strategy;

    constructor() {}

    authenticate(): void {
      return this.#strategy.authenticate();
    }
  };

export default makeAuth;
