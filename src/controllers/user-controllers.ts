import authorization from "../api/auth";
import { storeCurrentUser } from "../store/storeCurrentUser";
import { store } from "../store/store";

export class UserController {
  async signIn(data: { login: string; password: string }): Promise<boolean> {
    try {
      await authorization.signIn(data);
      store.set("isAuth", true);
      return true;
    } catch {
      store.set("isAuth", false);
      return false;
    }
  }

  async signUp(data: { login: string; password: string }): Promise<void> {
    await authorization.signUp(data);
    return store.set("isAuth", true);
  }

  async getUser(): Promise<boolean> {
    try {
      const data = await authorization.getUser();
      store.set("isAuth", true);
      storeCurrentUser.set("currentUser", data);
      return true;
    } catch {
      return false;
    }
  }

  async logout(): Promise<void> {
    await authorization.logout();
    store.set("isAuth", false);
    store.set("currentUser", null);
  }
}

export default new UserController();
