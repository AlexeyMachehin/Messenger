import { METHODS } from "./httpMethod";

export type HTTPOptions = {
  method: METHODS;
  data?: any;
  headers?: { [key: string]: string };
  withCredentials?: boolean;
};
export type HTTPOptionsPost = {
  data?: any;
  headers?: any;
};

export type HTTPOptionsGet = Partial<{
  [key: string]: string;
}>;
