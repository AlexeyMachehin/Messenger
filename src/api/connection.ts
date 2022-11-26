import { store } from "../store/Store";
import HTTPTransport from "../utils/httpTransport";

export class Connection extends HTTPTransport {
  connect(id: number): Promise<void> {
    return this.post<{ token: string }>(`chats/token/${id}`, {
      headers: { mode: "cors", credentials: "include" },
    }).then((response) => store.set("token", response.token));
  }
}
export const connection = new Connection();
