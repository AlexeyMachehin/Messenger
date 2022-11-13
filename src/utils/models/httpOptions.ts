import { METHODS } from "./httpMethod"

export type HTTPOptions = {
    method: METHODS, 
    data: any, 
}
export type HTTPOptionsPost = {
    data: any,
};