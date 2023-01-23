import { IUserEntity } from "./user.interface";

interface IHttpRequest {
  body: {};
  query: string;
  params: {};
  ip: string;
  method: string;
  path: string;
  locals: {};
  user: IUserEntity;
  headers: {
    "Content-Type": string;
    Referer: string;
    "User-Agent": string;
  };
}

interface IHttpSuccess {
  status: number;
  data: {};
  meta?: {};
}

interface IHttpError {
  status: number;
  data: {};
  stackTrace?: string;
}

interface IHttpResponseConstructable {
  new (status: number, data: {}, stackTrace?: string, meta?: {}):
    | IHttpError
    | IHttpSuccess;
}

export { IHttpRequest, IHttpResponseConstructable, IHttpSuccess, IHttpError };
