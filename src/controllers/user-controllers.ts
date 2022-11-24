import authorization from "../api/auth";
import { storeCurrentUser } from "../store/storeCurrentUser";
import { store } from "./../store/Store";

export class UserController {
  public signIn(data: { login: string; password: string }): Promise<void> {
    return authorization
      .signIn(data)
      .then(() => store.set("isAuth", true))
      .catch(() => store.set("isAuth", false));
  }

  public signUp(data: { login: string; password: string }): Promise<void> {
    return authorization.signUp(data).then((data) => store.set("isAuth", data));
  }

  public getUser(): Promise<boolean> {
    return authorization
      .getUser()
      .then((data) => {
        storeCurrentUser.set("currentUser", data);
        return true;
      })
      .catch(() => false);
  }

  public logout(): Promise<void> {
    return authorization
      .logout()
      .then(() => {
        store.set("isAuth", false);
        store.set("currentUser", null);
      });
  }
}

export default new UserController();
