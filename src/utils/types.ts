import {Dispatch} from "react";

interface IResponseError {
  login?: string;
  password?: string;
}

export interface IResponse {
  success: boolean;
  error?: IResponseError;
  login: string;
}

export interface IUser {
  login: string;
}

export interface ISetUser {
  setUser: Dispatch<IUser>;
}
