import { EventBus } from "../utils/eventBus";
export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  state: { [key: string]: any } = {};

  public getState() {
    return this.state;
  }
  public set(pathName: string, newState: any) {
    this.state[pathName] = newState;
    this.emit(StoreEvents.Updated, this.state);
  }
}

export const store = new Store();
