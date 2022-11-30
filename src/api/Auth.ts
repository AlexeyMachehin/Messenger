import { UserDto } from "../utils/dto/user";
import { HTTPTransport } from "../utils/HttpTransport";

export class AuthorizationAPI extends HTTPTransport {
  signIn(value: { login: string; password: string; }): Promise<void> {
    return this.post("auth/signin", { data: JSON.stringify(value) });
  }

  getUser(): Promise<UserDto> {
    return this.get<UserDto>("auth/user");
  }

  signUp(value: { login: string; password: string; }): Promise<XMLHttpRequest> {
    return this.post("auth/signup", { data: JSON.stringify(value) });
  }

  logout(): Promise<void> {
    return this.post("auth/logout", {});
  }

  changePassword(value: {
    oldPassword: string,
    newPassword: string;
  }): Promise<void> {
    return this.put<void>('user/password', { data: JSON.stringify(value) });
  }
}
