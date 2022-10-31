import { METHODS } from "./httpMethod"

export type HTTPOptions = {
    method: METHODS, 
    data: any, 
    headers: {}, 
    timeout: number
}
