import { store } from "../store/store";
import HTTPTransport from "../utils/httpTransport";

export class Connection extends HTTPTransport {
  connect(id: number): Promise<string> {
    return this.post<{ token: string; }>(`chats/token/${id}`, {
      headers: { mode: "cors", credentials: "include" },
    }).then((response) => { store.set("token", response.token); return response.token; });
  }
}
export const connection = new Connection();
