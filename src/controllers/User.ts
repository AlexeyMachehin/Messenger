import { AuthorizationAPI } from "../api/Auth";
import { storeCurrentUser } from "../store/StoreCurrentUser";
import { store } from "../store/Store";

const authorizationAPI = new AuthorizationAPI();

export class UserController {
  async signIn(data: { login: string; password: string }): Promise<boolean> {
    try {
      await authorizationAPI.signIn(data);
      store.set("isAuth", true);
      return true;
    } catch (error) {
      store.set("isAuth", false);
      alert(`Server error: ${(error as any).reason}. Try again`);
      return false;
    }
  }

  async signUp(data: { login: string; password: string }): Promise<boolean> {
    try {
      await authorizationAPI.signUp(data);
      store.set("isAuth", true);
      return true;
    } catch (error) {
      store.set("isAuth", false);
      alert(`Server error: ${(error as any).reason}. Try again`);
      return false;
    }
  }

  async getUser(): Promise<boolean> {
    try {
      const data = await authorizationAPI.getUser();
      store.set("isAuth", true);
      storeCurrentUser.set("currentUser", data);
      return true;
    } catch {
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await authorizationAPI.logout();
      store.set("isAuth", false);
      store.set("currentUser", null);
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
    }
  }
}
