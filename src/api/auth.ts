import { UserDto } from './../utils/dto/user-dto';
import HTTPTransport from "../utils/httpTransport";

export class AuthorizationAPI extends HTTPTransport {
  signIn(value: { login: string; password: string }): Promise<void> {
    return this.post("auth/signin", { data: JSON.stringify(value) });
  }

  getUser(): Promise<UserDto> {
    return this.get<UserDto>("auth/user");
  }

  signUp(value: { login: string; password: string }): Promise<XMLHttpRequest> {
    return this.post("auth/signup", { data: JSON.stringify(value) });
  }

  logout(): Promise<void> {
    return this.post("auth/logout", {});
  }
}

export default new AuthorizationAPI();
