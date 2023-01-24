class NotFoundError extends Error {
  status: number = 404;
  constructor(message: string) {
    super(message);
  }
}
class BadRequestError extends Error {
  status: number = 400;
  constructor(message: string) {
    super(message);
  }
}

class InternalServerError extends Error {
  status: number = 500;
  constructor(message: string) {
    super(message);
  }
}

class ForbiddenError extends Error {
  status: number = 403;
  constructor(message: string) {
    super(message);
  }
}

class UnauthorizedError extends Error {
  status: number = 401;
  constructor(message: string) {
    super(message);
  }
}

export {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ForbiddenError,
  UnauthorizedError,
};
