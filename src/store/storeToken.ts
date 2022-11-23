import { Store } from "./Store";

export enum StoreTokenEvents {
  Updated = "tokenUpdated",
}

export class StoreToken extends Store {
  setToken(value: { token: string }) {
    this.set("token", value);
    this.emit(StoreTokenEvents.Updated, this.state.token);
  }
}

export const storeToken = new StoreToken();
