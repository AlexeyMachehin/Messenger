import { AuthorizationAPI } from "../api/Auth";
import { UserAPI } from '../api/User';
import { store } from "../store/Store";
import { storeChat } from '../store/StoreChat';
import { storeCurrentUser } from "../store/StoreCurrentUser";
import { UserDto } from '../utils/dto/user';

const authorizationAPI = new AuthorizationAPI();
const userAPI = new UserAPI();
export class UserController {
  async signIn(data: { login: string; password: string; }): Promise<boolean> {
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

  async signUp(data: UserDto): Promise<boolean> {
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
      const data = await userAPI.getUser();
      store.set("isAuth", true);
      storeCurrentUser.setUser(data);
      return true;
    } catch {
      return false;
    }
  }

  async getUserById(id: number): Promise<UserDto | null> {
    try {
      const data = await userAPI.getUserById(id);
      storeChat.setChatUser(data);
      return data;
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
      return null;
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

  async changePassword(value: {
    oldPassword: string,
    newPassword: string;
  }) {
    try {
      await authorizationAPI.changePassword(value);
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
    }
  }
  async changeUserData(data: UserDto) {
    try {
      await userAPI.changeUserData(data);
      storeCurrentUser.setUser(data);
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
    }
  }
}
