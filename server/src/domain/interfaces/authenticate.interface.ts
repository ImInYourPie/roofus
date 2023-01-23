import { Request, Response, NextFunction } from "express";

interface IAuthStrategy {
  authenticate(req: Request, res: Response, next: NextFunction): void;
}

interface IAuthMiddleware {
  authenticate(strategy: IAuthStrategy): void;
}

export { IAuthStrategy, IAuthMiddleware };
