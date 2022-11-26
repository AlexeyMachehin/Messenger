import { UserDto } from "./../utils/dto/user-dto";
import { Store } from "./Store";

export enum StoreCurrentUserEvents {
  Updated = "chatUpdated",
}

export class StoreCurrentUser extends Store {
  setUser(user: UserDto) {
    this.set("currentUser", user);
    this.emit(StoreCurrentUserEvents.Updated, this.state.currentUser);
  }
  getCurrentUser(): UserDto | null {
    return this.getState().currentUser;
  }
}

export const storeCurrentUser = new StoreCurrentUser();
