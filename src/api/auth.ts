import { UserDto } from './../utils/dto/user-dto';
import HTTPTransport from "../utils/httpTransport";

export class AuthorizationAPI extends HTTPTransport {
  signIn(value: { login: string; password: string }): Promise<XMLHttpRequest> {
    return this.post("auth/signin", { data: JSON.stringify(value) });
  }

  getUser(): Promise<UserDto> {
    return this.get<UserDto>("auth/user");
  }
}

export default new AuthorizationAPI();
