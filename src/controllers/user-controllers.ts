import authorization from "../api/auth";
import { store } from "./../store/Store";

export class UserController {
  public signIn(data: { login: string; password: string }): void {
    authorization.signIn(data).then(data => store.set("isAuth", data));
  }

  public getUser(): void {
    
    authorization.getUser().then(data => store.set("first_name", data.first_name));
  }
}

export default new UserController();
