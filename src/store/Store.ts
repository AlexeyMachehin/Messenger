import { EventBus } from "../utils/eventBus";

export enum StoreEvents {
  Updated = "updated",
}
const initialState = {
  currentUser: null,
  isAuth: false,
  chats: null,
  token: null,
}

export class Store extends EventBus {
  state: Record<string, any> = initialState;

  public getState() {
    return this.state;
  }

  public set(pathName: string, newState: any): void {
    this.state[pathName] = newState;
  }
}

export const store = new Store();
