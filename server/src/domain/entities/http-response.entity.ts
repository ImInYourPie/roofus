import {
  IHttpError,
  IHttpResponseConstructable,
  IHttpSuccess,
} from "interfaces/http.interface";

abstract class HttpResponse {
  #type: string;
  #status: number;
  #data: {};

  constructor(type: string, status: number, data: {}) {
    this.#type = type;
    this.#status = status;
    this.#data = data;
  }

  public get type() {
    return this.#type;
  }

  public get status() {
    return this.#status;
  }

  public set status(status: number) {
    this.#status = status;
  }

  public get data() {
    return this.#data;
  }

  public set data(data: {}) {
    this.#data = data;
  }
}

class HttpSuccess extends HttpResponse implements IHttpSuccess {
  #meta?: {};

  constructor(status: number, data: {}, meta?: {}) {
    super("success", status, data);
    this.#meta = meta;
  }

  public get meta() {
    return this.#meta;
  }
}

class HttpError extends HttpResponse implements IHttpError {
  #stackTrace?: string;

  constructor(status: number, data: {}, stackTrace?: string) {
    super("error", status, data);
    this.#stackTrace = stackTrace;
  }

  public get stackTrace() {
    return this.#stackTrace;
  }
}

const makeResponse = (
  constructor: IHttpResponseConstructable,
  status: number,
  data: {},
) => {
  return new constructor(status, data);
};

export { makeResponse, HttpSuccess, HttpError };
